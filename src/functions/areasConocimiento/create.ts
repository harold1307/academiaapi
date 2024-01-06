import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { AreaConocimientoService } from "../../Core/AreaConocimiento/Application/Service";

const bodySchema = z.object({
	nombre: z.string(),
	codigo: z.string().nullable(),
});

export async function areasConocimientoCreate(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const body = await req.json();

		const bodyVal = bodySchema.safeParse(body);

		if (!bodyVal.success) {
			return {
				jsonBody: { message: "Peticion invalida" },
				status: 400,
			};
		}

		const areaConocimientoService = StartupBuilder.resolve(
			AreaConocimientoService,
		);

		const newAreaConocimiento =
			await areaConocimientoService.createAreaConocimiento(bodyVal.data);

		ctx.log({ newAreaConocimiento });

		return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { jsonBody: "Peticion invalida.", status: 400 };
		}

		return { jsonBody: "Error", status: 500 };
	}
}

app.http("areasConocimientoCreate", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: areasConocimientoCreate,
	route: "areas-conocimiento",
});
