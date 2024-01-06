import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { CampoFormacionService } from "../../Core/CampoFormacion/Application/Service";

export async function campoFormacionGetAll(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const campoFormacionService = StartupBuilder.resolve(CampoFormacionService);

		const campoFormacions = await campoFormacionService.getAllCampoFormacions();

		return {
			jsonBody: { data: campoFormacions, message: "Solicitud exitosa" },
			status: 200,
		};
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { jsonBody: { message: "Peticion invalida." }, status: 400 };
		}

		return { jsonBody: { message: "Error" }, status: 500 };
	}
}

app.http("campoFormacionGetAll", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: campoFormacionGetAll,
	route: "campos-formacion",
});
