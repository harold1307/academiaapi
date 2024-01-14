import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { VarianteCursoService } from "../../Core/VarianteCurso/Application/Service";

export async function byIdGetAsignaturas(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const varianteCursoId = req.params.varianteCursoId;

		if (!varianteCursoId) {
			return {
				jsonBody: {
					message: "El ID es invalido o no ha sido proporcionado.",
				},
				status: 400,
			};
		}

		const _varianteCursoService = StartupBuilder.resolve(VarianteCursoService);

		const varianteCurso =
			await _varianteCursoService.getVarianteCursoWithAsignaturasById(
				varianteCursoId,
			);

		return {
			jsonBody: { data: varianteCurso, message: "Solicitud exitosa." },
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

app.http("byIdGetAsignaturas", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: byIdGetAsignaturas,
	route: "variantes-curso/{varianteCursoId}/asignaturas",
});
