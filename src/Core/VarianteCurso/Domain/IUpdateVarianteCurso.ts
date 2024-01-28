import type { IVarianteCurso } from "./IVarianteCurso";

export type IUpdateVarianteCurso = Partial<
	Omit<IVarianteCurso, "id" | "fechaAprobacion" | "createdAt" | "updatedAt"> & {
		fechaAprobacion: string;
	}
>;
