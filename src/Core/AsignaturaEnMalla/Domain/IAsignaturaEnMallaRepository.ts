import type { IAsignaturaEnMalla } from "./IAsignaturaEnMalla";
import type { ICreateAnexoAsignaturaEnMalla } from "./ICreateAnexoAsignaturaEnMalla";
import type { ICreateAsignaturaEnMalla } from "./ICreateAsignaturaEnMalla";
import type { IUpdateAsignaturaEnMalla } from "./IUpdateAsignaturaEnMalla";

export type UpdateAsignaturaEnMallaParams = {
	id: string;
	data: IUpdateAsignaturaEnMalla;
};

export type IAsignaturaEnMallaRepository = {
	create(
		data: ICreateAsignaturaEnMalla | ICreateAnexoAsignaturaEnMalla,
	): Promise<IAsignaturaEnMalla>;
	getAll(): Promise<IAsignaturaEnMalla[]>;
	getById(id: string): Promise<IAsignaturaEnMalla | null>;
	update(params: UpdateAsignaturaEnMallaParams): Promise<IAsignaturaEnMalla>;
	deleteById(id: string): Promise<IAsignaturaEnMalla>;
};
