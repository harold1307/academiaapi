import type { ICentroInformacion } from "./ICentroInformacion";
import type { ICreateCentroInformacion } from "./ICreateCentroInformacion";
import type { UpdateCentroInformacionParams } from "./ICentroInformacionRepository";

export type ICentroInformacionService = {
	createCentroInformacion(
		data: ICreateCentroInformacion,
	): Promise<ICentroInformacion>;
	getAllCentroInformacions(): Promise<ICentroInformacion[]>;
	getCentroInformacionById(id: string): Promise<ICentroInformacion | null>;
	updateCentroInformacionById(
		params: UpdateCentroInformacionParams,
	): Promise<ICentroInformacion>;
	deleteCentroInformacionById(id: string): Promise<ICentroInformacion>;
};
