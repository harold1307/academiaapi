import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { MallaCurricularService } from "../../Core/MallaCurricular/Application/Service";

export async function mallasCurricularesCreate(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const body = await req.json();

		const mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);

		const newMallaCurricular =
			await mallaCurricularService.createMallaCurricular(body);

		ctx.log({ newMallaCurricular });

		return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { body: "Peticion invalida.", status: 400 };
		}

		return { body: "Error", status: 500 };
	}
}

app.http("mallasCurricularesCreate", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: mallasCurricularesCreate,
	route: "mallas-curriculares",
});
