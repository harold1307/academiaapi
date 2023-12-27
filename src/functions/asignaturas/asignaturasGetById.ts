import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { AsignaturaService } from "../../Core/Asignatura/Application/Service";

export async function asignaturasGetById(
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

		const asignatura = await asignaturaService.getAsignaturaById(id);

		return {
			jsonBody: { data: asignatura, message: "Solicitud exitosa." },
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

app.http("asignaturasGetById", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: asignaturasGetById,
	route: "asignaturas/{id}",
});
