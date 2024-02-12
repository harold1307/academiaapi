import type { ICreatePracticaPreProfesionalEnMalla } from "./ICreatePracticaPreProfesionalEnMalla";
import type { IPracticaPreProfesionalEnMalla } from "./IPracticaPreProfesionalEnMalla";
import type { IUpdatePracticaPreProfesionalEnMalla } from "./IUpdatePracticaPreProfesionalEnMalla";

export type UpdatePracticaPreProfesionalEnMallaParams = {
	id: string;
	data: IUpdatePracticaPreProfesionalEnMalla;
};

export type IPracticaPreProfesionalEnMallaRepository = {
	create(
		data: ICreatePracticaPreProfesionalEnMalla,
	): Promise<IPracticaPreProfesionalEnMalla>;
	// getAll(): Promise<IPracticaPreProfesionalEnMalla[]>;
	getById(id: string): Promise<IPracticaPreProfesionalEnMalla | null>;
	update(
		params: UpdatePracticaPreProfesionalEnMallaParams,
	): Promise<IPracticaPreProfesionalEnMalla>;
	deleteById(id: string): Promise<IPracticaPreProfesionalEnMalla>;
};
