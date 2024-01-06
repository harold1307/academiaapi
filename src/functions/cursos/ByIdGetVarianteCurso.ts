import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { CursoService } from "../../Core/Curso/Application/Service";

export async function byIdGetVariantesCursos(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const cursoId = req.params.cursoId;

		if (!cursoId) {
			return {
				jsonBody: {
					message: "El ID es invalido o no ha sido proporcionado.",
				},
				status: 400,
			};
		}

		const _cursoService = StartupBuilder.resolve(CursoService);

		const curso = await _cursoService.getCursoWithAllVarianteCursos(cursoId);

		return {
			jsonBody: { data: curso, message: "Solicitud exitosa." },
			status: 200,
		};
	} catch (error: any) {
		ctx.error(error);

		return {
			jsonBody: {
				message: error.message,
			},
			status: 500,
		};
	}
}

app.http("byIdGetVariantesCursos", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: byIdGetVariantesCursos,
	route: "cursos/{cursoId}/variantes",
});
