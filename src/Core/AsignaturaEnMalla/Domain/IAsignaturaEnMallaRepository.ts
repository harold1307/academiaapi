import type { IAsignaturaEnMalla } from "./IAsignaturaEnMalla";
import type { ICreateAnexoAsignaturaEnMalla } from "./ICreateAnexoAsignaturaEnMalla";
import type { ICreateAsignaturaEnMalla } from "./ICreateAsignaturaEnMalla";

export type IAsignaturaEnMallaRepository = {
	create(
		data: ICreateAsignaturaEnMalla | ICreateAnexoAsignaturaEnMalla,
	): Promise<IAsignaturaEnMalla>;
	// getAll(): Promise<IAsignaturaEnMalla[]>;
	// getById(id: string): Promise<IAsignaturaEnMalla | null>;
	// update(params: {
	// 	id: string;
	// 	mallaCurricular: IUpdateMallaCurricularOutput;
	// }): Promise<IAsignaturaEnMalla>;
	// deleteById(id: string): Promise<IAsignaturaEnMalla>;
};
