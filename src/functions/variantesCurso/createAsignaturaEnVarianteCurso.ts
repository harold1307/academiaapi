import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { AsignaturaEnVarianteCursoService } from "../../Core/AsignaturaEnVarianteCurso/Application/Service";
import type { ICreateAsignaturaEnVarianteCurso } from "../../Core/AsignaturaEnVarianteCurso/Domain/ICreateAsignaturaEnVarianteCurso";
import type { ZodInferSchema } from "../../types";

const bodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateAsignaturaEnVarianteCurso, "asignaturaId" | "varianteCursoId">
	>
>({
	validaCredito: z.boolean(),
	validaPromedio: z.boolean(),
	horasColaborativas: z.number(),
	horasAsistidasDocente: z.number(),
	horasAutonomas: z.number(),
	horasPracticas: z.number(),
	sumaHoras: z.boolean(),
	creditos: z.number(),
	requeridoAprobar: z.boolean(),
	asistenciaAprobar: z.number(),
});

export async function createAsignaturaEnVarianteCurso(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const body = await req.json();

		const varianteCursoId = req.params.varianteCursoId;
		const asignaturaId = req.params.asignaturaId;

		if (!varianteCursoId || !asignaturaId) {
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

		const _asignaturaEnVarianteCursoService = StartupBuilder.resolve(
			AsignaturaEnVarianteCursoService,
		);

		const newAsignaturaEnVarianteCurso =
			await _asignaturaEnVarianteCursoService.createAsignaturaEnVarianteCurso({
				asignaturaId,
				varianteCursoId,
				data,
			});

		ctx.log({ newAsignaturaEnVarianteCurso });

		return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { jsonBody: { message: "Peticion invalida." }, status: 400 };
		}

		return { jsonBody: { message: "Error" }, status: 500 };
	}
}

app.http("createAsignaturaEnVarianteCurso", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: createAsignaturaEnVarianteCurso,
	route: "variantes-curso/{varianteCursoId}/asignaturas/{asignaturaId}",
});
