import type { IUpdateVarianteCurso } from "./IUpdateVarianteCurso";
import type { IVarianteCurso } from "./IVarianteCurso";
import type { IVarianteCursoWithAsignaturas } from "./IVarianteCursoWithAsignaturas";

export type IUpdateVarianteCursoByIdParams = {
	id: string;
	data: IUpdateVarianteCurso;
};

export type IVarianteCursoRepository = {
	getById(id: string): Promise<IVarianteCurso | null>;
	updateById(params: IUpdateVarianteCursoByIdParams): Promise<IVarianteCurso>;

	withAsignaturasGetById(
		id: string,
	): Promise<IVarianteCursoWithAsignaturas | null>;
};
