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

export async function institucionesUpdateById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const parse = z.string().uuid().safeParse(req.params.id);

		if (!parse.success)
			throw new Error("El ID es invalido o no ha sido proporcionado.");

		const id = parse.data;
		const body = await req.json();

		const institucionService = StartupBuilder.resolve(InstitucionService);

		const institucion = await institucionService.updateInstitucionById({
			id,
			institucion: body,
		});

		return {
			jsonBody: { data: institucion, message: "Actualizacion exitosa." },
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

app.http("institucionesUpdateById", {
	methods: ["PATCH"],
	authLevel: "anonymous",
	handler: institucionesUpdateById,
	route: "instituciones/{id}",
});
