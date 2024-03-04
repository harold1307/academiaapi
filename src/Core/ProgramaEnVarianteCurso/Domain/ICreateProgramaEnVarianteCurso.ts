import type { IProgramaEnVarianteCurso } from "./IProgramaEnVarianteCurso";

export type ICreateProgramaEnVarianteCurso = Omit<
	IProgramaEnVarianteCurso,
	"id" | "createdAt" | "updatedAt"
>;
