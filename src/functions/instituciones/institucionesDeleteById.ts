import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { InstitucionService } from "../../Core/Institucion/Application/Service";

export async function institucionesDeleteById(
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

		const isDeleted = await institucionService.deleteInstitucionById(id);

		if (!isDeleted) {
			return {
				jsonBody: {
					message: "No se ha eliminado la institucion.",
				},
				status: 400,
			};
		}

		return {
			jsonBody: { message: "Institucion eliminada con exito." },
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

app.http("institucionesDeleteById", {
	methods: ["DELETE"],
	authLevel: "anonymous",
	handler: institucionesDeleteById,
	route: "instituciones/{id}",
});
