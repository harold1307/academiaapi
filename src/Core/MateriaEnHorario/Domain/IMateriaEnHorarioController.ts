import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IMateriaEnHorarioController = {
	materiasEnHorarioDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	materiasEnHorarioGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	materiasEnHorarioGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	materiasEnHorarioUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
