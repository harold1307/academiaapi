import type { ICreateCursoEscuela } from "./ICreateCursoEscuela";
import type { ICursoEscuela } from "./ICursoEscuela";
import type { UpdateCursoEscuelaParams } from "./ICursoEscuelaRepository";
import type { ICursoEscuelaWithProgramas } from "./ICursoEscuelaWithProgramas";

export type CreateCursoEscuelaByPlantillaTransactionParams = {
	cursoEscuela: ICreateCursoEscuela;
	cursoPlantillaId: string;
};

export type ICursoEscuelaService = {
	createCursoEscuela(data: ICreateCursoEscuela): Promise<ICursoEscuela>;
	getAllCursoEscuelas(): Promise<ICursoEscuela[]>;
	getCursoEscuelaById(id: string): Promise<ICursoEscuela | null>;
	updateCursoEscuelaById(
		params: UpdateCursoEscuelaParams,
	): Promise<ICursoEscuela>;
	deleteCursoEscuelaById(id: string): Promise<ICursoEscuela>;

	createCursoEscuelaByPlantillaTransaction(
		params: CreateCursoEscuelaByPlantillaTransactionParams,
	): Promise<ICursoEscuela>;
	getCursoEscuelaWithProgramasById(
		id: string,
	): Promise<ICursoEscuelaWithProgramas | null>;
};
