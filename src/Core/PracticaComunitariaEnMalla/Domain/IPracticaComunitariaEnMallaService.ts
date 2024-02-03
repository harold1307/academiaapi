import type { IPracticaComunitariaEnMalla } from "./IPracticaComunitariaEnMalla";
import type { ICreatePracticaComunitariaEnMalla } from "./ICreatePracticaComunitariaEnMalla";
import type { UpdatePracticaComunitariaEnMallaParams } from "./IPracticaComunitariaEnMallaRepository";

export type IPracticaComunitariaEnMallaService = {
	createPracticaComunitariaEnMalla(
		data: ICreatePracticaComunitariaEnMalla,
	): Promise<IPracticaComunitariaEnMalla>;
	// getAllPracticaComunitariaEnMallas(): Promise<IPracticaComunitariaEnMalla[]>;
	getPracticaComunitariaEnMallaById(
		id: string,
	): Promise<IPracticaComunitariaEnMalla | null>;
	updatePracticaComunitariaEnMallaById(
		params: UpdatePracticaComunitariaEnMallaParams,
	): Promise<IPracticaComunitariaEnMalla>;
	deletePracticaComunitariaEnMallaById(
		id: string,
	): Promise<IPracticaComunitariaEnMalla>;
};
