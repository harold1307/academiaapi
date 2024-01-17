import type { HttpHandler } from "@azure/functions";

export type IModalidadController = {
	modalidadesGetAll: HttpHandler;
	modalidadesCreate: HttpHandler;
	modalidadesGetById: HttpHandler;
	modalidadesDeleteById: HttpHandler;
	modalidadesUpdateById: HttpHandler;
};
