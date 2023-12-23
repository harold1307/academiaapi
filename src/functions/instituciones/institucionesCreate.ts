import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { InstitucionService } from "../../Core/Institucion/Application/Service";

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

		return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
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
