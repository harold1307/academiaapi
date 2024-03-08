import type { ICreateProgramaEnCursoEscuela } from "./ICreateProgramaEnCursoEscuela";
import type { IProgramaEnCursoEscuela } from "./IProgramaEnCursoEscuela";
import type { IUpdateProgramaEnCursoEscuela } from "./IUpdateProgramaEnCursoEscuela";

export type UpdateProgramaEnCursoEscuelaParams = {
	id: string;
	data: IUpdateProgramaEnCursoEscuela;
};

export type IProgramaEnCursoEscuelaRepository = {
	create(data: ICreateProgramaEnCursoEscuela): Promise<IProgramaEnCursoEscuela>;
	// getAll(): Promise<IProgramaEnCursoEscuela[]>;
	getById(id: string): Promise<IProgramaEnCursoEscuela | null>;
	update(
		params: UpdateProgramaEnCursoEscuelaParams,
	): Promise<IProgramaEnCursoEscuela>;
	deleteById(id: string): Promise<IProgramaEnCursoEscuela>;
};
