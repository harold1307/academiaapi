import type { IVarianteCurso } from "./IVarianteCurso";

export type IUpdateVarianteCurso = Partial<
	Omit<IVarianteCurso, "id" | "createdAt" | "updatedAt" | "cursoId">
>;
