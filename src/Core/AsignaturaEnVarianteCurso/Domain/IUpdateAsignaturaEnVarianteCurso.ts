import type { ICreateAsignaturaEnVarianteCurso } from "./ICreateAsignaturaEnVarianteCurso";

export type IUpdateAsignaturaEnVarianteCurso = Partial<
	Omit<ICreateAsignaturaEnVarianteCurso, "varianteCursoId">
>;
