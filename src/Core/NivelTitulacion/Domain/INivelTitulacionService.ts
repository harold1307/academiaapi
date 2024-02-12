import type { ICreateNivelTitulacion } from "./ICreateNivelTitulacion";
import type { INivelTitulacion } from "./INivelTitulacion";
import type { UpdateNivelTitulacionParams } from "./INivelTitulacionRepository";

export type INivelTitulacionService = {
	createNivelTitulacion(
		data: ICreateNivelTitulacion,
	): Promise<INivelTitulacion>;
	getAllNivelesTitulacion(): Promise<INivelTitulacion[]>;
	getNivelTitulacionById(id: string): Promise<INivelTitulacion | null>;
	updateNivelTitulacionById(
		params: UpdateNivelTitulacionParams,
	): Promise<INivelTitulacion>;
	deleteNivelTitulacionById(id: string): Promise<INivelTitulacion>;
};
