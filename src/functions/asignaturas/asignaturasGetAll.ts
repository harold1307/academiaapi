import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { AsignaturaService } from "../../Core/Asignatura/Application/Service";

export async function asignaturasGetAll(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const asignaturaService = StartupBuilder.resolve(AsignaturaService);

		const asignaturas = await asignaturaService.getAllAsignaturas();

		return {
			jsonBody: { data: asignaturas, message: "Solicitud exitosa" },
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

app.http("asignaturasGetAll", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: asignaturasGetAll,
	route: "asignaturas",
});
