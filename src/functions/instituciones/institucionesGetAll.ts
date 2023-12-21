import "reflect-metadata";
import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { InstitucionService } from "../../Core/Institucion/Application/Service";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

export async function institucionesGetAll(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const institucionService = StartupBuilder.resolve(InstitucionService);

		const instituciones = await institucionService.getAllInstituciones();

		return { jsonBody: { data: instituciones }, status: 200 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { body: "Peticion invalida.", status: 400 };
		}

		return { body: "Error", status: 500 };
	}
}

app.http("institucionesGetAll", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: institucionesGetAll,
	route: "instituciones",
});
