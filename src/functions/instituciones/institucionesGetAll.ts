import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { InstitucionService } from "../../Core/Institucion/Application/Service";

export async function institucionesGetAll(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const institucionService = StartupBuilder.resolve(InstitucionService);

		const instituciones = await institucionService.getAllInstituciones();

		return {
			jsonBody: { data: instituciones, message: "Solicitud exitosa" },
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

app.http("institucionesGetAll", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: institucionesGetAll,
	route: "instituciones",
});
