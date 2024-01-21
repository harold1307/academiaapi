import type { IAsignaturaEnCursoEscuela } from "./IAsignaturaEnCursoEscuela";
import type { ICreateAsignaturaEnCursoEscuela } from "./ICreateAsignaturaEnCursoEscuela";
import type { IUpdateAsignaturaEnCursoEscuela } from "./IUpdateAsignaturaEnCursoEscuela";

export type IUpdateAsignaturaEnCursoEscuelaParams = {
	id: string;
	data: IUpdateAsignaturaEnCursoEscuela;
};

export type IAsignaturaEnCursoEscuelaRepository = {
	create(
		data: ICreateAsignaturaEnCursoEscuela,
	): Promise<IAsignaturaEnCursoEscuela>;
	getAll(): Promise<IAsignaturaEnCursoEscuela[]>;
	getById(id: string): Promise<IAsignaturaEnCursoEscuela | null>;
	update(
		params: IUpdateAsignaturaEnCursoEscuelaParams,
	): Promise<IAsignaturaEnCursoEscuela>;
	deleteById(id: string): Promise<IAsignaturaEnCursoEscuela>;
};
