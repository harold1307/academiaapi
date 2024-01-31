import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type ITipoDocumentoController = {
	tiposDocumentoCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	tiposDocumentoDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	tiposDocumentoGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	tiposDocumentoGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	tiposDocumentoUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
