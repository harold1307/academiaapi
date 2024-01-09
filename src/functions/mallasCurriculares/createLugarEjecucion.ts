import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { MallaCurricularService } from "../../Core/MallaCurricular/Application/Service";
import type { ICreateLugarEjecucion } from "../../Core/MallaCurricular/Domain/ICreateLugarEjecucion";
import type { ZodInferSchema } from "../../types";

const bodySchema = z.object<
	ZodInferSchema<Omit<ICreateLugarEjecucion, "mallaId">>
>({
	institucionId: z.string(),
	codigo: z.string().nullable(),
});

export async function createLugarEjecucion(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const body = await req.json();
		const mallaId = req.params.mallaId;

		if (!mallaId) {
			return {
				jsonBody: { message: "ID invalido o no ha sido proporcionado" },
				status: 400,
			};
		}

		const bodyVal = bodySchema.safeParse(body);

		if (!bodyVal.success) {
			return {
				jsonBody: { message: "Peticion invalida" },
				status: 400,
			};
		}

		const { data } = bodyVal;

		const _mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);

		const newLugarEjecucion =
			await _mallaCurricularService.createLugarEjecucion(mallaId, data);

		ctx.log({ newLugarEjecucion });

		return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { body: "Peticion invalida.", status: 400 };
		}

		return { body: "Error", status: 500 };
	}
}

app.http("createLugarEjecucion", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: createLugarEjecucion,
	route: "mallas-curriculares/{mallaId}/lugares-ejecucion",
});
