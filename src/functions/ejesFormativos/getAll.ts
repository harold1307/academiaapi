import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { EjeFormativoService } from "../../Core/EjeFormativo/Application/Service";

export async function ejeFormativosGetAll(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const ejeFormativoService = StartupBuilder.resolve(EjeFormativoService);

		const ejeFormativos = await ejeFormativoService.getAllEjeFormativos();

		return {
			jsonBody: { data: ejeFormativos, message: "Solicitud exitosa" },
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

app.http("ejeFormativosGetAll", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: ejeFormativosGetAll,
	route: "ejes-formativos",
});
