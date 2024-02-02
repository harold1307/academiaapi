import type { INivelMalla } from "./INivelMalla";
import type { UpdateNivelMallaParams } from "./INivelMallaRepository";

export type INivelMallaService = {
	getAllNivelMallas(): Promise<INivelMalla[]>;
	getNivelMallaById(id: string): Promise<INivelMalla | null>;
	updateNivelMallaById(params: UpdateNivelMallaParams): Promise<INivelMalla>;
};
