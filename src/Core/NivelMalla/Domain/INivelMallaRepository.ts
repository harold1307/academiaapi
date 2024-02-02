import type { INivelMalla } from "./INivelMalla";
import type { IUpdateNivelMalla } from "./IUpdateNivelMalla";

export type UpdateNivelMallaParams = {
	id: string;
	data: IUpdateNivelMalla;
};

export type INivelMallaRepository = {
	getAll(): Promise<INivelMalla[]>;
	getById(id: string): Promise<INivelMalla | null>;
	update(params: UpdateNivelMallaParams): Promise<INivelMalla>;
};
