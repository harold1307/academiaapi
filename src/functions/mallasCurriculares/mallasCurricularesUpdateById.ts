import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { MallaCurricularService } from "../../Core/MallaCurricular/Application/Service";

export async function mallasCurricularesUpdateById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const parse = z.string().uuid().safeParse(req.params.id);

		if (!parse.success)
			throw new Error("El ID es invalido o no ha sido proporcionado.");

		const id = parse.data;
		const body = await req.json();

		const mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);

		const mallaCurricular =
			await mallaCurricularService.updateMallaCurricularById({
				id,
				mallaCurricular: body,
			});

		return {
			jsonBody: { data: mallaCurricular, message: "Actualizacion exitosa." },
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

app.http("mallasCurricularesUpdateById", {
	methods: ["PATCH"],
	authLevel: "anonymous",
	handler: mallasCurricularesUpdateById,
	route: "mallas-curriculares/{id}",
});
