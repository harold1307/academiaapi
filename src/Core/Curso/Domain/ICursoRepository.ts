import type { ICreateCurso } from "./ICreateCurso";
import type { ICurso } from "./ICurso";
import type { ICursoWithVariantes } from "./ICursoWithVariantes";
import type { IUpdateCurso } from "./IUpdateCurso";

export type UpdateCursoParams = { id: string; data: IUpdateCurso };

export interface ICursoRepository {
	create(data: ICreateCurso): Promise<ICurso>;
	getAll(): Promise<ICurso[]>;
	getById(id: string): Promise<ICursoWithVariantes | null>;
	update(params: UpdateCursoParams): Promise<ICurso>;
	deleteById(id: string): Promise<ICurso>;

	getAllVarianteCursoFromCursoId(
		cursoId: string,
	): Promise<ICursoWithVariantes | null>;
}
