import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IProgramaEnCursoEscuelaController = {
	// programasEnCursosEscuelaCreate(
	// 	req: HttpRequest,
	// 	ctx: InvocationContext,
	// ): Promise<HttpResponseInit>;
	programasEnCursosEscuelaDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	// programasEnCursosEscuelaGetAll(
	// 	req: HttpRequest,
	// 	ctx: InvocationContext,
	// ): Promise<HttpResponseInit>;
	programasEnCursosEscuelaGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	programasEnCursosEscuelaUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
