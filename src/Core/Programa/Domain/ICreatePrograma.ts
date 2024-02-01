import type { IPrograma } from "./IPrograma";

export type ICreatePrograma = Omit<
	IPrograma,
	| "id"
	| "enUso"
	| "createdAt"
	| "updatedAt"
	| "nivelTitulacion"
	| "detalleNivelTitulacion"
	| "estado"
>;
