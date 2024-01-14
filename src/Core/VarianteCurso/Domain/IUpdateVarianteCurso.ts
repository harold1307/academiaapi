import type { IVarianteCurso } from "./IVarianteCurso";

export type IUpdateVarianteCurso = Partial<
	Omit<IVarianteCurso, "id" | "fechaAprobacion"> & {
		fechaAprobacion: string;
	}
>;
