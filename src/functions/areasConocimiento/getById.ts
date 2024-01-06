import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { AreaConocimientoService } from "../../Core/AreaConocimiento/Application/Service";

export async function areasConocimientoGetById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const id = req.params.id;

		if (!id) {
			return {
				jsonBody: { message: "El ID es invalido o no ha sido proporcionado." },
				status: 400,
			};
		}

		const areaConocimientoService = StartupBuilder.resolve(
			AreaConocimientoService,
		);

		const areaConocimiento =
			await areaConocimientoService.getAreaConocimientoById(id);

		return {
			jsonBody: { data: areaConocimiento, message: "Solicitud exitosa." },
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

app.http("areasConocimientoGetById", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: areasConocimientoGetById,
	route: "areas-conocimiento/{id}",
});
