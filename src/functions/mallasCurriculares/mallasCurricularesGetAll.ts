import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { MallaCurricularService } from "../../Core/MallaCurricular/Application/Service";

export async function mallasCurricularesGetAll(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);

		const mallaCurriculares =
			await mallaCurricularService.getAllMallasCurriculares();

		return {
			jsonBody: { data: mallaCurriculares, message: "Solicitud exitosa" },
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

app.http("mallasCurricularesGetAll", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: mallasCurricularesGetAll,
	route: "mallas-curriculares",
});
