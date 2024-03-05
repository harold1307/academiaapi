import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IUsuarioController = {
	usuariosCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	// usuariosDeleteById(
	// 	req: HttpRequest,
	// 	ctx: InvocationContext,
	// ): Promise<HttpResponseInit>;
	usuariosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	usuariosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	usuariosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	usuariosCreateAlumno(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	usuariosCreateAdministrativo(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	usuariosCreateProfesor(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	usuariosCreateInscripcion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	usuariosAppendToGroup(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	usuariosRemoveFromGroup(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	usuariosUpdateAlumnoWithInscripcion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	usuariosUpdateAdministrativo(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	usuariosUpdateProfesor(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	usuariosCreateAsesorCrm(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	usuariosCreateResponsableCrm(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	usuariosCreateAsesorEstudiante(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
