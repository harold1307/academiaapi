import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { CursoService } from "../../Core/Curso/Application/Service";

export async function cursosGetAll(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);

		const cursoService = StartupBuilder.resolve(CursoService);

		const cursos = await cursoService.getAllCursos();

		return {
			jsonBody: { data: cursos, message: "Solicitud exitosa" },
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

app.http("cursosGetAll", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: cursosGetAll,
	route: "cursos",
});
