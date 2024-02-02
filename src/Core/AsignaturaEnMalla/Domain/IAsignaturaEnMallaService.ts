import type { IAsignaturaEnMalla } from "./IAsignaturaEnMalla";
import type { UpdateAsignaturaEnMallaParams } from "./IAsignaturaEnMallaRepository";
import type { ICreateAnexoAsignaturaEnMalla } from "./ICreateAnexoAsignaturaEnMalla";
import type { ICreateAsignaturaEnMalla } from "./ICreateAsignaturaEnMalla";
import type { IUpdateAnexoAsignaturaEnMalla } from "./IUpdateAnexoAsignaturaEnMalla";

export type CreateAnexoAsignaturaEnMallaParams = {
	data: ICreateAnexoAsignaturaEnMalla | any;
	mallaId: string;
	asignaturaId: string;
};

export type CreateAsignaturaEnMallaParams = {
	data: ICreateAsignaturaEnMalla | any;
	mallaId: string;
	asignaturaId: string;
};

export type IAsignaturaEnMallaService = {
	createAsignaturaEnMalla(
		params: CreateAsignaturaEnMallaParams,
	): Promise<IAsignaturaEnMalla>;
	getAllAsignaturasEnMallas(): Promise<IAsignaturaEnMalla[]>;
	getAsignaturaEnMallaById(id: string): Promise<IAsignaturaEnMalla | null>;
	updateAsignaturaEnMallaById(
		params: UpdateAsignaturaEnMallaParams,
	): Promise<IAsignaturaEnMalla>;
	updateAnexoAsignaturaEnMallaById(params: {
		id: string;
		data: IUpdateAnexoAsignaturaEnMalla;
	}): Promise<IAsignaturaEnMalla>;
	deleteAsignaturaEnMallaById(id: string): Promise<IAsignaturaEnMalla>;
	createAnexoAsignaturaEnMalla(
		params: CreateAnexoAsignaturaEnMallaParams,
	): Promise<IAsignaturaEnMalla>;
};
