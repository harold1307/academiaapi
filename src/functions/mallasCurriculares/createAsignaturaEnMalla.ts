import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { $Enums } from "@prisma/client";
import { z } from "zod";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { AsignaturaService } from "../../Core/Asignatura/Application/Service";
import { AsignaturaEnMallaService } from "../../Core/AsignaturaEnMalla/Application/Service";
import type { ICreateAsignaturaEnMalla } from "../../Core/AsignaturaEnMalla/Domain/ICreateAsignaturaEnMalla";
import { CompetenciaService } from "../../Core/Competencia/Application/Service";
import { MallaCurricularService } from "../../Core/MallaCurricular/Application/Service";
import type { Prettify, ZodInferSchema } from "../../types";

export async function createAsignaturaEnMalla(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const body = await req.json();

		const mallaId = req.params.mallaId;
		const asignaturaId = req.params.asignaturaId;

		if (!mallaId || !asignaturaId) {
			return {
				jsonBody: { message: "ID invalido o no ha sido proporcionado" },
				status: 400,
			};
		}

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

		const malla = await _mallaService.getMallaCurricularById(mallaId);

		if (!malla) {
			return {
				jsonBody: { message: "Malla curricular no existe" },
				status: 400,
			};
		}

		if (malla.niveles < data.nivel) {
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

		let newAsignaturaEnMallaId;

		if (data.esAnexo && !data.ejeFormativoId) {
			const asignaturaEnMalla =
				await _asignaturaEnMallaService.createAnexoAsignaturaEnMalla({
					mallaId,
					asignaturaId,
					data,
				});

			newAsignaturaEnMallaId = asignaturaEnMalla.id;

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		}

		if (!data.esAnexo && data.ejeFormativoId) {
			const asignaturaEnMalla =
				await _asignaturaEnMallaService.createAsignaturaEnMalla(
					data,
					mallaId,
					asignaturaId,
				);

			newAsignaturaEnMallaId = asignaturaEnMalla.id;
		}

		if (data.competenciaGenerica && newAsignaturaEnMallaId) {
			await _competenciaService.createCompetenciaForAsignaturaEnMalla(
				{ nombre: data.competenciaGenerica },
				newAsignaturaEnMallaId,
			);
		}

		if (newAsignaturaEnMallaId) {
			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		}

		return { body: "Peticion invalida.", status: 400 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { body: "Peticion invalida.", status: 400 };
		}

		return { body: "Error", status: 500 };
	}
}

type Body = Prettify<
	Omit<
		ICreateAsignaturaEnMalla,
		"mallaId" | "asignaturaId" | "esAnexo" | "ejeFormativoId"
	> & {
		competenciaGenerica: string | null;
		esAnexo: boolean;
		ejeFormativoId: string | null;
	}
>;

const bodySchema = z.object<ZodInferSchema<Body>>({
	esAnexo: z.boolean(),
	nivel: z.number(),
	tipoAsignatura: z.nativeEnum($Enums.TipoAsignatura),
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
	sumaHoras: z.boolean(),
	creditos: z.number(),
	noValidaAsistencia: z.boolean(),
	materiaComun: z.boolean(),
	objetivos: z.string().nullable(),
	descripcion: z.string().nullable(),
	resultadosAprendizaje: z.string().nullable(),

	competenciaGenerica: z.string().nullable(),
	ejeFormativoId: z.string().nullable(),
	areaConocimientoId: z.string(),
	campoFormacionId: z.string(),
});

app.http("createAsignaturaEnMalla", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: createAsignaturaEnMalla,
	route: "mallas-curriculares/{mallaId}/asignaturas/{asignaturaId}",
});
