import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { CursoService } from "../../Core/Curso/Application/Service";

export async function variantesCursoUpdateById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const varianteCursoId = req.params.varianteCursoId;

		if (!varianteCursoId) {
			return {
				jsonBody: { message: "ID invalido o no ha sido proporcionado" },
				status: 400,
			};
		}

		const body = await req.json();

		const _cursoService = StartupBuilder.resolve(CursoService);

		const curso = await _cursoService.updateVarianteCurso({
			id: varianteCursoId,
			data: body,
		});

		return {
			jsonBody: { data: curso, message: "Actualizacion exitosa." },
			status: 200,
		};
	} catch (error: any) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { jsonBody: { message: "Peticion invalida." }, status: 400 };
		}

		return {
			jsonBody: {
				message: error.message,
			},
			status: 500,
		};
	}
}

app.http("variantesCursoUpdateById", {
	methods: ["PATCH"],
	authLevel: "anonymous",
	handler: variantesCursoUpdateById,
	route: "variantes-curso/{varianteCursoId}",
});
