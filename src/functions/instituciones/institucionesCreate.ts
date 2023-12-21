import "reflect-metadata";
import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { InstitucionService } from "../../Core/Institucion/Application/Service";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

export async function institucionesCreate(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const body = await req.json();

		const institucionService = StartupBuilder.resolve(InstitucionService);

		const newInstitucion = await institucionService.createInstitucion(body);

		ctx.log({ newInstitucion });

		return { body: "Institucion creada con exito", status: 201 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { body: "Peticion invalida.", status: 400 };
		}

		return { body: "Error", status: 500 };
	}
}

app.http("institucionesCreate", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: institucionesCreate,
	route: "instituciones",
});
