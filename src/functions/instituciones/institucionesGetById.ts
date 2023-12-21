import "reflect-metadata";
import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";

import { InstitucionService } from "../../Core/Institucion/Application/Service";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

export async function institucionesGetById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const parse = z.string().uuid().safeParse(req.params.id);

		if (!parse.success)
			throw new Error("El ID es invalido o no ha sido proporcionado.");

		const id = parse.data;

		const institucionService = StartupBuilder.resolve(InstitucionService);

		const institucion = await institucionService.getInstitucionById(id);

		return {
			jsonBody: { data: institucion, message: "Solicitud exitosa." },
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

app.http("institucionesGetById", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: institucionesGetById,
	route: "instituciones/{id}",
});
