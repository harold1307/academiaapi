import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IAsesorEstudianteController = {
	// asesoresEstudianteCreate(
	// 	req: HttpRequest,
	// 	ctx: InvocationContext,
	// ): Promise<HttpResponseInit>;
	asesoresEstudianteDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	asesoresEstudianteGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	asesoresEstudianteGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	asesoresEstudianteUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
