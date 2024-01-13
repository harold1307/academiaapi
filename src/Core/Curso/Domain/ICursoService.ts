import type { IAsignaturaEnVarianteCurso } from "./IAsignaturaEnVarianteCurso";
import type { ICurso } from "./ICurso";
import type { ICursoWithVariantes } from "./ICursoWithVariantes";
import type { IVarianteCursoWithAsignaturas } from "./IVarianteCursoWithAsignaturas";
import type { IVarianteCursoWithCurso } from "./IVarianteCursoWithCurso";

export type ICreateAsignaturaEnVarianteCursoParams = {
	asignaturaId: string;
	varianteCursoId: string;
	data: object;
};

export type ICursoService = {
	createCurso(data: any): Promise<ICurso>;
	getAllCursos(): Promise<ICurso[]>;
	getCursoById(id: string): Promise<ICursoWithVariantes | null>;
	updateCursoById(params: { id: string; curso: any }): Promise<ICurso>;
	deleteCursoById(id: string): Promise<ICurso>;

	createVarianteCurso(
		cursoId: string,
		data: unknown,
	): Promise<IVarianteCursoWithCurso>;
	getCursoWithAllVarianteCursos(
		cursoId: string,
	): Promise<ICursoWithVariantes | null>;

	createAsignaturaEnVarianteCurso(
		params: ICreateAsignaturaEnVarianteCursoParams,
	): Promise<IAsignaturaEnVarianteCurso>;
	getVarianteCursoWithAsignaturasById(
		id: string,
	): Promise<IVarianteCursoWithAsignaturas | null>;
};
