import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IProgramaController = {
	programasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	programasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	programasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	programasUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	programasCreateTipoDocumento(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	programasCreateTituloObtenido(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	programasCreateMalla(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};