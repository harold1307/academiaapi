import type { ICreateVarianteCurso } from "./ICreateVarianteCurso";
import type { IVarianteCurso } from "./IVarianteCurso";
import type { IVarianteCursoWithAsignaturas } from "./IVarianteCursoWithAsignaturas";
import type { IVarianteCursoWithCurso } from "./IVarianteCursoWithCurso";

export type IUpdateVarianteCursoByIdParams = {
	id: string;
	data: any;
};

export type ICreateVarianteCursoParams = {
	cursoId: string;
	data: ICreateVarianteCurso;
};

export type IVarianteCursoService = {
	createVarianteCurso(
		params: ICreateVarianteCursoParams,
	): Promise<IVarianteCursoWithCurso>;

	updateVarianteCurso(
		params: IUpdateVarianteCursoByIdParams,
	): Promise<IVarianteCurso>;

	deleteVarianteCurso(id: string): Promise<IVarianteCurso>;

	getVarianteCursoWithAsignaturasById(
		id: string,
	): Promise<IVarianteCursoWithAsignaturas | null>;
};
