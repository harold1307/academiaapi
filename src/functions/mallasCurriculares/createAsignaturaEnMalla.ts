import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { AsignaturaService } from "../../Core/Asignatura/Application/Service";
import { AsignaturaEnMallaService } from "../../Core/AsignaturaEnMalla/Application/Service";
import type { ICreateAsignaturaEnMalla } from "../../Core/AsignaturaEnMalla/Domain/ICreateAsignaturaEnMalla";
import { CompetenciaService } from "../../Core/Competencia/Application/Service";
import { MallaCurricularService } from "../../Core/MallaCurricular/Application/Service";

const uuid = z.string().uuid();

export async function createAsignaturaEnMalla(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const body = await req.json();

		const bodyVal = bodySchema.safeParse(body);

		if (!bodyVal.success) {
			return {
				jsonBody: { message: "Peticion invalida" },
				status: 400,
			};
		}

		const { data } = bodyVal;

		const _mallaService = StartupBuilder.resolve(MallaCurricularService);
		const _asignaturaService = StartupBuilder.resolve(AsignaturaService);
		const _asignaturaEnMallaService = StartupBuilder.resolve(
			AsignaturaEnMallaService,
		);
		const _competenciaService = StartupBuilder.resolve(CompetenciaService);

		const validations = [req.params.mallaId, req.params.asignaturaId].map(id =>
			uuid.safeParse(id),
		);

		const [mallaVal, asignaturaVal] = validations;

		if (!mallaVal?.success || !asignaturaVal?.success) {
			return {
				jsonBody: { message: "ID invalido o no ha sido proporcionado" },
				status: 400,
			};
		}

		const mallaId = mallaVal.data;
		const asignaturaId = asignaturaVal.data;

		const malla = await _mallaService.getMallaCurricularById(mallaId);

		if (!malla) {
			return {
				jsonBody: { message: "Malla curricular no existe" },
				status: 400,
			};
		}

		if (malla.niveles > data.nivel) {
			return {
				jsonBody: { message: "El nivel especificado es mayor a la malla" },
				status: 400,
			};
		}

		const asignatura = await _asignaturaService.getAsignaturaById(asignaturaId);

		if (!asignatura) {
			return {
				jsonBody: { message: "Asignatura no existe" },
				status: 400,
			};
		}

		const asignaturaEnMalla =
			await _asignaturaEnMallaService.createAsignaturaEnMalla(
				data,
				mallaId,
				asignaturaId,
			);

		await _competenciaService.createCompetenciaForAsignaturaEnMalla(
			{ nombre: data.competenciaGenerica },
			asignaturaEnMalla.id,
		);

		return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { body: "Peticion invalida.", status: 400 };
		}

		return { body: "Error", status: 500 };
	}
}

const bodySchema: z.ZodType<
	Omit<ICreateAsignaturaEnMalla, "mallaId" | "asignaturaId"> & {
		competenciaGenerica: string;
	}
> = z.object({
	ejeFormativo: z.string(),
	nivel: z.number(),
	areaConocimiento: z.string(),
	campoFormacion: z.string(),
	tipoAsignatura: z.string(),
	identificacion: z.string(),
	permiteMatriculacion: z.boolean(),
	validaCredito: z.boolean(),
	validaPromedio: z.boolean(),
	costoEnMatricula: z.boolean(),
	practicasPreProfesionales: z.boolean(),
	requeridaEgreso: z.boolean(),
	cantidadMatriculas: z.number(),
	horasSemanales: z.number(),
	horasColaborativas: z.number(),
	horasAsistidasDocente: z.number(),
	horasAutonomas: z.number(),
	horasPracticas: z.number(),
	creditos: z.number(),
	noValidaAsistencia: z.boolean(),
	materiaComun: z.boolean(),
	objetivos: z.string(),
	descripcion: z.string(),
	resultadosAprendizaje: z.string(),

	competenciaGenerica: z.string(),
});

app.http("createAsignaturaEnMalla", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: createAsignaturaEnMalla,
	route: "mallas-curriculares/{mallaId}/asignaturas/{asignaturaId}",
});
