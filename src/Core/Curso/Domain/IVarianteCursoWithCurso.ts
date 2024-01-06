import type { IVarianteCurso } from "./IVarianteCurso";
import type { ICurso } from "./ICurso";

export type IVarianteCursoWithCurso = IVarianteCurso & {
	curso: ICurso;
};
