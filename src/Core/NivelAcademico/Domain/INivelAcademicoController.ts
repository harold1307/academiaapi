import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type INivelAcademicoController = {
	// nivelesAcademicosCreate(
	// 	req: HttpRequest,
	// 	ctx: InvocationContext,
	// ): Promise<HttpResponseInit>;
	nivelesAcademicosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	nivelesAcademicosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	nivelesAcademicosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	nivelesAcademicosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	nivelesAcademicosCreateMaterias(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	nivelesAcademicosGetByIdWithMaterias(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	nivelesAcademicosCreateMateriaEnHorario(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
