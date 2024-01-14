import type { ICurso } from "./ICurso";
import type { ICursoWithVariantes } from "./ICursoWithVariantes";

export type ICursoService = {
	createCurso(data: any): Promise<ICurso>;
	getAllCursos(): Promise<ICurso[]>;
	getCursoById(id: string): Promise<ICursoWithVariantes | null>;
	updateCursoById(params: { id: string; curso: any }): Promise<ICurso>;
	deleteCursoById(id: string): Promise<ICurso>;

	getCursoWithAllVarianteCursos(
		cursoId: string,
	): Promise<ICursoWithVariantes | null>;
};
