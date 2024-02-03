import type { IPracticaComunitariaEnMalla } from "./IPracticaComunitariaEnMalla";
import type { ICreatePracticaComunitariaEnMalla } from "./ICreatePracticaComunitariaEnMalla";
import type { IUpdatePracticaComunitariaEnMalla } from "./IUpdatePracticaComunitariaEnMalla";

export type UpdatePracticaComunitariaEnMallaParams = {
	id: string;
	data: IUpdatePracticaComunitariaEnMalla;
};

export type IPracticaComunitariaEnMallaRepository = {
	create(
		data: ICreatePracticaComunitariaEnMalla,
	): Promise<IPracticaComunitariaEnMalla>;
	// getAll(): Promise<IPracticaComunitariaEnMalla[]>;
	getById(id: string): Promise<IPracticaComunitariaEnMalla | null>;
	update(
		params: UpdatePracticaComunitariaEnMallaParams,
	): Promise<IPracticaComunitariaEnMalla>;
	deleteById(id: string): Promise<IPracticaComunitariaEnMalla>;
};
