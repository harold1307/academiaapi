import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { CampoFormacionService } from "../../Core/CampoFormacion/Application/Service";

export async function camposFormacionGetById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const id = req.params.id;

		if (!id) {
			return {
				jsonBody: { message: "El ID es invalido o no ha sido proporcionado." },
				status: 400,
			};
		}

		const campoFormacionService = StartupBuilder.resolve(CampoFormacionService);

		const campoFormacion =
			await campoFormacionService.getCampoFormacionById(id);

		return {
			jsonBody: { data: campoFormacion, message: "Solicitud exitosa." },
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

app.http("camposFormacionGetById", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: camposFormacionGetById,
	route: "campos-formacion/{id}",
});
