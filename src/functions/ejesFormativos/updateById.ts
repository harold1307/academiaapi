import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { EjeFormativoService } from "../../Core/EjeFormativo/Application/Service";

export async function ejeFormativosUpdateById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const id = req.params.id;

		if (!id) {
			return {
				jsonBody: { message: "El ID es invalido o no ha sido proporcionado." },
				status: 400,
			};
		}

		const body = await req.json();

		const ejeFormativoService = StartupBuilder.resolve(EjeFormativoService);

		const ejeFormativo = await ejeFormativoService.updateEjeFormativoById({
			id,
			ejeFormativo: body,
		});

		return {
			jsonBody: { data: ejeFormativo, message: "Actualizacion exitosa." },
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

app.http("ejeFormativosUpdateById", {
	methods: ["PATCH"],
	authLevel: "anonymous",
	handler: ejeFormativosUpdateById,
	route: "ejes-formativos/{id}",
});
