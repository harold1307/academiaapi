import type { ICampoFormacion } from "./ICampoFormacion";
import type { UpdateCampoFormacionParams } from "./ICampoFormacionRepository";

export type ICampoFormacionService = {
	createCampoFormacion(data: any): Promise<ICampoFormacion>;
	getAllCampoFormacions(): Promise<ICampoFormacion[]>;
	getCampoFormacionById(id: string): Promise<ICampoFormacion | null>;
	updateCampoFormacionById(
		params: UpdateCampoFormacionParams,
	): Promise<ICampoFormacion>;
	deleteCampoFormacionById(id: string): Promise<ICampoFormacion>;
};
