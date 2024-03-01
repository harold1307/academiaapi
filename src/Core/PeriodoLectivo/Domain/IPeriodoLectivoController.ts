import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type IPeriodoLectivoController = {
	periodosLectivosCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	periodosLectivosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	periodosLectivosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	periodosLectivosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	periodosLectivosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	periodosLectivosUpdateCalculoCosto(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	periodosLectivosCreateRequisitoMatriculacion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	periodosLectivosCreateSubPeriodo(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	periodosLectivosCreateCronogramaMatriculacion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;

	periodosLectivosGetByIdWithCronogramasMatriculacion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	periodosLectivosGetByIdWithSubPeriodos(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	periodosLectivosGetByIdWithRequisitosMatriculacion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
};
