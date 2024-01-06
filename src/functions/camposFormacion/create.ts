import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { CampoFormacionService } from "../../Core/CampoFormacion/Application/Service";

const bodySchema = z.object({
	nombre: z.string(),
});

export async function camposFormacionCreate(
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

		const campoFormacionService = StartupBuilder.resolve(CampoFormacionService);

		const newCampoFormacion = await campoFormacionService.createCampoFormacion(
			bodyVal.data,
		);

		ctx.log({ newCampoFormacion });

		return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { jsonBody: "Peticion invalida.", status: 400 };
		}

		return { jsonBody: "Error", status: 500 };
	}
}

app.http("camposFormacionCreate", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: camposFormacionCreate,
	route: "campos-formacion",
});
