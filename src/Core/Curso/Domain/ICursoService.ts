import type { ICurso } from "./ICurso";

export interface ICursoService {
	createCurso(data: any): Promise<ICurso>;
	getAllCursos(): Promise<ICurso[]>;
	getCursoById(id: string): Promise<ICurso | null>;
	updateCursoById(params: { id: string; curso: any }): Promise<ICurso>;
	deleteCursoById(id: string): Promise<ICurso>;
}
