import type { IPrograma } from "./IPrograma";

export type IProgramaQueryFilter = Partial<
	Omit<
		IPrograma,
		| "enUso"
		| "nivelTitulacion"
		| "detalleNivelTitulacion"
		| "id"
		| "createdAt"
		| "updatedAt"
	> & {
		coordinacion_sedeId: string;
	}
>;
