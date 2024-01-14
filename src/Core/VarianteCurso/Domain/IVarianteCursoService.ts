import type { IVarianteCursoWithCurso } from "./IVarianteCursoWithCurso";
import type { IVarianteCurso } from "./IVarianteCurso";
import type { IVarianteCursoWithAsignaturas } from "./IVarianteCursoWithAsignaturas";

export type IUpdateVarianteCursoByIdParams = {
	id: string;
	data: any;
};

export type ICreateVarianteCursoParams = {
	cursoId: string;
	data: unknown;
};

export type IVarianteCursoService = {
	createVarianteCurso(
		params: ICreateVarianteCursoParams,
	): Promise<IVarianteCursoWithCurso>;

	updateVarianteCurso(
		params: IUpdateVarianteCursoByIdParams,
	): Promise<IVarianteCurso>;

	getVarianteCursoWithAsignaturasById(
		id: string,
	): Promise<IVarianteCursoWithAsignaturas | null>;
};
