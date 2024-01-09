import type { ICampoFormacion } from "./ICampoFormacion";

export type ICampoFormacionService = {
	createCampoFormacion(data: any): Promise<ICampoFormacion>;
	getAllCampoFormacions(): Promise<ICampoFormacion[]>;
	getCampoFormacionById(id: string): Promise<ICampoFormacion | null>;
	updateCampoFormacionById(params: {
		id: string;
		campoFormacion: unknown;
	}): Promise<ICampoFormacion>;
	deleteCampoFormacionById(id: string): Promise<ICampoFormacion>;
};
