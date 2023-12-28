import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { CursoService } from "../../Core/Curso/Application/Service";

export async function cursosDeleteById(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const parse = z.string().uuid().safeParse(req.params.id);

		if (!parse.success)
			throw new Error("El ID es invalido o no ha sido proporcionado.");

		const id = parse.data;

		const cursoService = StartupBuilder.resolve(CursoService);

		const isDeleted = await cursoService.deleteCursoById(id);

		if (!isDeleted) {
			return {
				jsonBody: {
					message: "No se ha eliminado la curso.",
				},
				status: 400,
			};
		}

		return {
			jsonBody: { message: "Curso eliminada con exito." },
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

app.http("cursosDeleteById", {
	methods: ["DELETE"],
	authLevel: "anonymous",
	handler: cursosDeleteById,
	route: "cursos/{id}",
});
