import type { IAsignaturaModuloEnMalla } from "./IAsignaturaModuloEnMalla";
import type { ICreateAsignaturaModuloEnMalla } from "./ICreateAsignaturaModuloEnMalla";
import type { IUpdateAsignaturaModuloEnMalla } from "./IUpdateAsignaturaModuloEnMalla";

export type UpdateAsignaturaModuloEnMallaParams = {
	id: string;
	data: IUpdateAsignaturaModuloEnMalla;
};

export type IAsignaturaModuloEnMallaRepository = {
	create(
		data: ICreateAsignaturaModuloEnMalla,
	): Promise<IAsignaturaModuloEnMalla>;
	getAll(): Promise<IAsignaturaModuloEnMalla[]>;
	getById(id: string): Promise<IAsignaturaModuloEnMalla | null>;
	update(
		params: UpdateAsignaturaModuloEnMallaParams,
	): Promise<IAsignaturaModuloEnMalla>;
	deleteById(id: string): Promise<IAsignaturaModuloEnMalla>;
};
