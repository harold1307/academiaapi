import type { NonNullableObject } from "../../../types";
import type { IPrograma } from "./IPrograma";

export type IProgramaQueryFilter = Partial<
	NonNullableObject<
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
	>
>;
