import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { CampoFormacionService } from "../../Core/CampoFormacion/Application/Service";

export async function campoFormacionsDeleteById(
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

		const campoFormacionService = StartupBuilder.resolve(CampoFormacionService);

		const isDeleted = await campoFormacionService.deleteCampoFormacionById(id);

		if (!isDeleted) {
			return {
				jsonBody: {
					message: "No se ha eliminado la campoFormacion.",
				},
				status: 400,
			};
		}

		return {
			jsonBody: { message: "CampoFormacion eliminado con exito." },
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

app.http("campoFormacionsDeleteById", {
	methods: ["DELETE"],
	authLevel: "anonymous",
	handler: campoFormacionsDeleteById,
	route: "campos-formacion/{id}",
});
