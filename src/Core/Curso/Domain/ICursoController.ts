import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type ICursoController = {
	cursosCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	cursosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	cursosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	cursosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	cursosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	cursosCreateVarianteCurso(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	cursosByIdGetVarianteCurso(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
