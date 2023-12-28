import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";

import { StartupBuilder } from "../../Main/Inversify/Inversify.config";
import { CursoService } from "../../Core/Curso/Application/Service";

export async function cursosCreate(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const body = await req.json();

		const cursoService = StartupBuilder.resolve(CursoService);

		const newCurso = await cursoService.createCurso(body);

		ctx.log({ newCurso });

		return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { body: "Peticion invalida.", status: 400 };
		}

		return { body: "Error", status: 500 };
	}
}

app.http("cursosCreate", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: cursosCreate,
	route: "cursos",
});
