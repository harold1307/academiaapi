import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { AsignaturaService } from "../../Core/Asignatura/Application/Service";

export async function asignaturasCreate(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const body = await req.json();

		const asignaturaService = StartupBuilder.resolve(AsignaturaService);

		const newAsignatura = await asignaturaService.createAsignatura(body);

		ctx.log({ newAsignatura });

		return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { body: "Peticion invalida.", status: 400 };
		}

		return { body: "Error", status: 500 };
	}
}

app.http("asignaturasCreate", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: asignaturasCreate,
	route: "asignaturas",
});
