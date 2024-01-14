import type { IAsignaturaEnVarianteCurso } from "../../AsignaturaEnVarianteCurso/Domain/IAsignaturaEnVarianteCurso";
import type { IVarianteCurso } from "./IVarianteCurso";

export type IVarianteCursoWithAsignaturas = IVarianteCurso & {
	asignaturas: IAsignaturaEnVarianteCurso[];
};
