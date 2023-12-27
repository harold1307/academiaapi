import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { AsignaturaService } from "../../Core/Asignatura/Application/Service";

export async function asignaturasDeleteById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const parse = z.string().uuid().safeParse(req.params.id);

		if (!parse.success)
			throw new Error("El ID es invalido o no ha sido proporcionado.");

		const id = parse.data;

		const asignaturaService = StartupBuilder.resolve(AsignaturaService);

		const isDeleted = await asignaturaService.deleteAsignaturaById(id);

		if (!isDeleted) {
			return {
				jsonBody: {
					message: "No se ha eliminado la asignatura.",
				},
				status: 400,
			};
		}

		return {
			jsonBody: { message: "Asignatura eliminada con exito." },
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

app.http("asignaturasDeleteById", {
	methods: ["DELETE"],
	authLevel: "anonymous",
	handler: asignaturasDeleteById,
	route: "asignaturas/{id}",
});
