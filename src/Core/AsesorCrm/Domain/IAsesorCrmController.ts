import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IAsesorCrmController = {
	// asesoresCrmCreate(
	// 	req: HttpRequest,
	// 	ctx: InvocationContext,
	// ): Promise<HttpResponseInit>;
	asesoresCrmDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	asesoresCrmGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	// asesoresCrmGetById(
	// 	req: HttpRequest,
	// 	ctx: InvocationContext,
	// ): Promise<HttpResponseInit>;
	asesoresCrmUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
