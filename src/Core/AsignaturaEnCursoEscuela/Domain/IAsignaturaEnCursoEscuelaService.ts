import type { IAsignaturaEnCursoEscuela } from "./IAsignaturaEnCursoEscuela";
import type { IUpdateAsignaturaEnCursoEscuelaParams } from "./IAsignaturaEnCursoEscuelaRepository";
import type { ICreateAsignaturaEnCursoEscuela } from "./ICreateAsignaturaEnCursoEscuela";

export type IAsignaturaEnCursoEscuelaService = {
	createAsignaturaEnCursoEscuela(
		data: ICreateAsignaturaEnCursoEscuela,
	): Promise<IAsignaturaEnCursoEscuela>;
	getAllAsignaturaEnCursoEscuelas(): Promise<IAsignaturaEnCursoEscuela[]>;
	getAsignaturaEnCursoEscuelaById(
		id: string,
	): Promise<IAsignaturaEnCursoEscuela | null>;
	updateAsignaturaEnCursoEscuelaById(
		params: IUpdateAsignaturaEnCursoEscuelaParams,
	): Promise<IAsignaturaEnCursoEscuela>;
	deleteAsignaturaEnCursoEscuelaById(
		id: string,
	): Promise<IAsignaturaEnCursoEscuela>;
};
