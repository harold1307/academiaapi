import type { ICreateCursoEscuela } from "./ICreateCursoEscuela";
import type { ICursoEscuela } from "./ICursoEscuela";

export type CreateCursoEscuelaByPlantillaTransactionParams = {
	cursoEscuela: ICreateCursoEscuela;
	cursoPlantillaId: string;
};

export type ICursoEscuelaService = {
	createCursoEscuela(data: ICreateCursoEscuela): Promise<ICursoEscuela>;
	getAllCursoEscuelas(): Promise<ICursoEscuela[]>;
	getCursoEscuelaById(id: string): Promise<ICursoEscuela | null>;
	// updateCursoEscuelaById(params: IUpdateCursoEscuelaParams): Promise<ICursoEscuela>;
	deleteCursoEscuelaById(id: string): Promise<ICursoEscuela>;

	// createCursoEscuelaByPlantillaTransaction(
	// 	params: CreateCursoEscuelaByPlantillaTransactionParams,
	// ): Promise<ICursoEscuela>;
};
