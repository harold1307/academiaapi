import type { IVarianteCurso } from "./IVarianteCurso";
import type { ICurso } from "../../Curso/Domain/ICurso";

export type IVarianteCursoWithCurso = IVarianteCurso & {
	curso: ICurso;
};
