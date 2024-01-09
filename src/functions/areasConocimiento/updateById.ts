import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { AreaConocimientoService } from "../../Core/AreaConocimiento/Application/Service";

export async function areaConocimientosUpdateById(
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

		const body = await req.json();

		const areaConocimientoService = StartupBuilder.resolve(
			AreaConocimientoService,
		);

		const areaConocimiento =
			await areaConocimientoService.updateAreaConocimientoById({
				id,
				data: body,
			});

		return {
			jsonBody: { data: areaConocimiento, message: "Actualizacion exitosa." },
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

app.http("areaConocimientosUpdateById", {
	methods: ["PATCH"],
	authLevel: "anonymous",
	handler: areaConocimientosUpdateById,
	route: "areas-conocimiento/{id}",
});
