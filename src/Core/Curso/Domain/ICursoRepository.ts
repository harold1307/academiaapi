import type { ICreateCurso } from "./ICreateCurso";
import type { ICurso } from "./ICurso";
import type { IUpdateCurso } from "./IUpdateCurso";

export interface ICursoRepository {
	create(data: ICreateCurso): Promise<ICurso>;
	getAll(): Promise<ICurso[]>;
	getById(id: string): Promise<ICurso | null>;
	update(params: { id: string; curso: IUpdateCurso }): Promise<ICurso>;
	deleteById(id: string): Promise<ICurso>;
}
