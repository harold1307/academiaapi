import type { IAsignaturaEnNivelMalla } from "./IAsignaturaEnNivelMalla";
import type { ICreateAsignaturaEnNivelMalla } from "./ICreateAsignaturaEnNivelMalla";
import type { IUpdateAsignaturaEnNivelMalla } from "./IUpdateAsignaturaEnNivelMalla";

export type UpdateAsignaturaEnNivelMallaParams = {
	id: string;
	data: IUpdateAsignaturaEnNivelMalla;
};

export type IAsignaturaEnNivelMallaRepository = {
	create(data: ICreateAsignaturaEnNivelMalla): Promise<IAsignaturaEnNivelMalla>;
	getAll(): Promise<IAsignaturaEnNivelMalla[]>;
	getById(id: string): Promise<IAsignaturaEnNivelMalla | null>;
	update(
		params: UpdateAsignaturaEnNivelMallaParams,
	): Promise<IAsignaturaEnNivelMalla>;
	deleteById(id: string): Promise<IAsignaturaEnNivelMalla>;
};
