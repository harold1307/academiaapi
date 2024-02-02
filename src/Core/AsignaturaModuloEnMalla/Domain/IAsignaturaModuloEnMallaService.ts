import type { IAsignaturaModuloEnMalla } from "./IAsignaturaModuloEnMalla"
import type { ICreateAsignaturaModuloEnMalla } from "./ICreateAsignaturaModuloEnMalla"
import type { UpdateAsignaturaModuloEnMallaParams } from "./IAsignaturaModuloEnMallaRepository";

export type IAsignaturaModuloEnMallaService = {
  createAsignaturaModuloEnMalla(data: ICreateAsignaturaModuloEnMalla): Promise<IAsignaturaModuloEnMalla>;
	getAllAsignaturaModuloEnMallas(): Promise<IAsignaturaModuloEnMalla[]>;
	getAsignaturaModuloEnMallaById(id: string): Promise<IAsignaturaModuloEnMalla | null>;
	updateAsignaturaModuloEnMallaById(params: UpdateAsignaturaModuloEnMallaParams): Promise<IAsignaturaModuloEnMalla>;
	deleteAsignaturaModuloEnMallaById(id: string): Promise<IAsignaturaModuloEnMalla>;
}