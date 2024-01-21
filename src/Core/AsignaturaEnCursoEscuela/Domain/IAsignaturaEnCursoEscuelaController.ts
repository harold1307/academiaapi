import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IAsignaturaEnCursoEscuelaController = {
	asignaturasEnCursoEscuelasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	asignaturasEnCursoEscuelasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	asignaturasEnCursoEscuelasUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	asignaturasEnCursoEscuelasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
