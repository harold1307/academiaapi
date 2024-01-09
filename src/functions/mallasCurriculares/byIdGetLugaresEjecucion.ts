import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { MallaCurricularService } from "../../Core/MallaCurricular/Application/Service";

export async function mallasCurricularesGetByIdWithLugaresEjecucion(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const mallaId = req.params.mallaId;

		if (!mallaId) {
			return {
				jsonBody: { message: "Peticion invalida" },
				status: 400,
			};
		}

		const mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);

		const mallaCurricular =
			await mallaCurricularService.getMallaCurricularByIdWithLugaresEjecucion(
				mallaId,
			);

		return {
			jsonBody: { data: mallaCurricular, message: "Solicitud exitosa." },
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

app.http("mallasCurricularesGetByIdWithLugaresEjecucion", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: mallasCurricularesGetByIdWithLugaresEjecucion,
	route: "mallas-curriculares/{mallaId}/lugares-ejecucion",
});
