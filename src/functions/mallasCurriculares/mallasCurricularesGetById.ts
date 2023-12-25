import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { MallaCurricularService } from "../../Core/MallaCurricular/Application/Service";

export async function mallasCurricularesGetById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const parse = z.string().uuid().safeParse(req.params.id);

		if (!parse.success)
			throw new Error("El ID es invalido o no ha sido proporcionado.");

		const id = parse.data;

		const mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);

		const mallaCurricular =
			await mallaCurricularService.getMallaCurricularById(id);

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

app.http("mallasCurricularesGetById", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: mallasCurricularesGetById,
	route: "mallas-curriculares/{id}",
});
