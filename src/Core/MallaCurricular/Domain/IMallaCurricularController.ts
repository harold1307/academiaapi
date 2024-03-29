import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IMallaCurricularController = {
	mallasCurricularesCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	mallasCurricularesDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	mallasCurricularesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	mallasCurricularesGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	mallasCurricularesUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	mallasCurricularesCreateLugarEjecucion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	mallasCurricularesCreateAsignaturaEnMalla(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	mallasCurricularesGetByIdWithLugaresEjecucion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	mallasCurricularesGetByIdWithAsignaturas(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
