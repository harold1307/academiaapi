import type { ICreatePracticaPreProfesionalEnMalla } from "./ICreatePracticaPreProfesionalEnMalla";
import type { IPracticaPreProfesionalEnMalla } from "./IPracticaPreProfesionalEnMalla";
import type { UpdatePracticaPreProfesionalEnMallaParams } from "./IPracticaPreProfesionalEnMallaRepository";

export type IPracticaPreProfesionalEnMallaService = {
	createPracticaPreProfesionalEnMalla(
		data: ICreatePracticaPreProfesionalEnMalla,
	): Promise<IPracticaPreProfesionalEnMalla>;
	// getAllPracticaPreProfesionalEnMallas(): Promise<IPracticaPreProfesionalEnMalla[]>;
	getPracticaPreProfesionalEnMallaById(
		id: string,
	): Promise<IPracticaPreProfesionalEnMalla | null>;
	updatePracticaPreProfesionalEnMallaById(
		params: UpdatePracticaPreProfesionalEnMallaParams,
	): Promise<IPracticaPreProfesionalEnMalla>;
	deletePracticaPreProfesionalEnMallaById(
		id: string,
	): Promise<IPracticaPreProfesionalEnMalla>;
};
