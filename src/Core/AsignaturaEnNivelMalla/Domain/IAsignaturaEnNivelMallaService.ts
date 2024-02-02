import type { IAsignaturaEnNivelMalla } from "./IAsignaturaEnNivelMalla";
import type { UpdateAsignaturaEnNivelMallaParams } from "./IAsignaturaEnNivelMallaRepository";
import type { ICreateAsignaturaEnNivelMalla } from "./ICreateAsignaturaEnNivelMalla";

export type IAsignaturaEnNivelMallaService = {
	createAsignaturaEnNivelMalla(
		data: ICreateAsignaturaEnNivelMalla,
	): Promise<IAsignaturaEnNivelMalla>;
	getAllAsignaturaEnNivelMallas(): Promise<IAsignaturaEnNivelMalla[]>;
	getAsignaturaEnNivelMallaById(
		id: string,
	): Promise<IAsignaturaEnNivelMalla | null>;
	updateAsignaturaEnNivelMallaById(
		params: UpdateAsignaturaEnNivelMallaParams,
	): Promise<IAsignaturaEnNivelMalla>;
	deleteAsignaturaEnNivelMallaById(
		id: string,
	): Promise<IAsignaturaEnNivelMalla>;
};
