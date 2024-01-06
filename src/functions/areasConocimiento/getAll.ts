import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { AreaConocimientoService } from "../../Core/AreaConocimiento/Application/Service";

export async function areasConocimientoGetAll(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const areaConocimientoService = StartupBuilder.resolve(
			AreaConocimientoService,
		);

		const areaConocimientos =
			await areaConocimientoService.getAllAreaConocimientos();

		return {
			jsonBody: { data: areaConocimientos, message: "Solicitud exitosa" },
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

app.http("areasConocimientoGetAll", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: areasConocimientoGetAll,
	route: "areas-conocimiento",
});
