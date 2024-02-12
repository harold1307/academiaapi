import type { ICreateCurso } from "./ICreateCurso";
import type { ICurso } from "./ICurso";
import type { UpdateCursoParams } from "./ICursoRepository";
import type { ICursoWithVariantes } from "./ICursoWithVariantes";

export type ICursoService = {
	createCurso(data: ICreateCurso): Promise<ICurso>;
	getAllCursos(): Promise<ICurso[]>;
	getCursoById(id: string): Promise<ICursoWithVariantes | null>;
	updateCursoById(params: UpdateCursoParams): Promise<ICurso>;
	deleteCursoById(id: string): Promise<ICurso>;

	getCursoWithAllVarianteCursos(
		cursoId: string,
	): Promise<ICursoWithVariantes | null>;
};
