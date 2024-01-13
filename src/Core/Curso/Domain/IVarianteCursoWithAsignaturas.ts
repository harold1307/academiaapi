import type { IAsignaturaEnVarianteCurso } from "./IAsignaturaEnVarianteCurso";
import type { IVarianteCurso } from "./IVarianteCurso";

export type IVarianteCursoWithAsignaturas = IVarianteCurso & {
	asignaturas: IAsignaturaEnVarianteCurso[];
};
