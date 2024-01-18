import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type ISesionController = {
	sesionesCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	sesionesDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	sesionesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	sesionesGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
