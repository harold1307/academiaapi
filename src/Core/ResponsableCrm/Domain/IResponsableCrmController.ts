import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IResponsableCrmController = {
	// responsablesCrmCreate(
	// 	req: HttpRequest,
	// 	ctx: InvocationContext,
	// ): Promise<HttpResponseInit>;
	responsablesCrmDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	responsablesCrmGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	responsablesCrmGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	responsablesCrmUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
