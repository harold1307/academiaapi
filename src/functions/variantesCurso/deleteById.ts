import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { VarianteCursoService } from "../../Core/VarianteCurso/Application/Service";

export async function variantesCursoDeleteById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const varianteCursoId = req.params.varianteCursoId;

		if (!varianteCursoId) {
			return {
				jsonBody: {
					message: "ID invalido o no ha sido proporcionado",
				},
				status: 400,
			};
		}

		const _varianteCursoService = StartupBuilder.resolve(VarianteCursoService);

		await _varianteCursoService.deleteVarianteCurso(varianteCursoId);

		return {
			jsonBody: { message: "Recurso eliminado con exito." },
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

app.http("variantesCursoDeleteById", {
	methods: ["DELETE"],
	authLevel: "anonymous",
	handler: variantesCursoDeleteById,
	route: "variantes-curso/{varianteCursoId}",
});
