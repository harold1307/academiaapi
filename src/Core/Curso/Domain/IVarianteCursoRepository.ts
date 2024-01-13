import type { IVarianteCurso } from "./IVarianteCurso";
import type { IVarianteCursoWithAsignaturas } from "./IVarianteCursoWithAsignaturas";

export type IVarianteCursoRepository = {
	getById(id: string): Promise<IVarianteCurso | null>;
	withAsignaturasGetById(
		id: string,
	): Promise<IVarianteCursoWithAsignaturas | null>;
};
