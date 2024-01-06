import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { EjeFormativoService } from "../../Core/EjeFormativo/Application/Service";

export async function ejesFormativosGetById(
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

		const ejeFormativoService = StartupBuilder.resolve(EjeFormativoService);

		const ejeFormativo = await ejeFormativoService.getEjeFormativoById(id);

		return {
			jsonBody: { data: ejeFormativo, message: "Solicitud exitosa." },
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

app.http("ejesFormativosGetById", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: ejesFormativosGetById,
	route: "ejes-formativos/{id}",
});
