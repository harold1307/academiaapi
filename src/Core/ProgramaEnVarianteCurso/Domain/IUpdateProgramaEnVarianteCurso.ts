import type { ICreateProgramaEnVarianteCurso } from "./ICreateProgramaEnVarianteCurso";

export type IUpdateProgramaEnVarianteCurso = Partial<
	Omit<ICreateProgramaEnVarianteCurso, "varianteCursoId">
>;
