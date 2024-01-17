import type { ICreateCursoEscuela } from "./ICreateCursoEscuela";
import type { ICursoEscuela } from "./ICursoEscuela";

export type ICursoEscuelaRepository = {
	create(data: ICreateCursoEscuela): Promise<ICursoEscuela>;
	getAll(): Promise<ICursoEscuela[]>;
	getById(id: string): Promise<ICursoEscuela | null>;
	// update(params: IUpdateCursoEscuelaParams): Promise<ICursoEscuela>;
	deleteById(id: string): Promise<ICursoEscuela>;
};
