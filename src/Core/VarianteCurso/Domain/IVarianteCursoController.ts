import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IVarianteCursoController = {
	variantesCursoDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	variantesCursoUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	variantesCursoByIdGetAsignaturas(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	variantesCursoByIdCreateAsignatura(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	variantesCursoByIdCreateCursoEscuela(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	// variantesCursoUpdateById(
	// 	req: HttpRequest,
	// 	ctx: InvocationContext,
	// ): Promise<HttpResponseInit>;
};
