import type { ICreateProgramaEnCursoEscuela } from "./ICreateProgramaEnCursoEscuela";
import type { IProgramaEnCursoEscuela } from "./IProgramaEnCursoEscuela";
import type { UpdateProgramaEnCursoEscuelaParams } from "./IProgramaEnCursoEscuelaRepository";

export type IProgramaEnCursoEscuelaService = {
	createProgramaEnCursoEscuela(
		data: ICreateProgramaEnCursoEscuela,
	): Promise<IProgramaEnCursoEscuela>;
	// getAllProgramaEnCursoEscuelas(): Promise<IProgramaEnCursoEscuela[]>;
	getProgramaEnCursoEscuelaById(
		id: string,
	): Promise<IProgramaEnCursoEscuela | null>;
	updateProgramaEnCursoEscuelaById(
		params: UpdateProgramaEnCursoEscuelaParams,
	): Promise<IProgramaEnCursoEscuela>;
	deleteProgramaEnCursoEscuelaById(
		id: string,
	): Promise<IProgramaEnCursoEscuela>;
};
