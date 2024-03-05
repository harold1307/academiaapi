import type { ICreateAsesorCrmEnCentroInformacion } from "./ICreateAsesorCrmEnCentroInformacion";
import type { IUpdateAsesorCrmEnCentroInformacion } from "./IUpdateAsesorCrmEnCentroInformacion";

export type IAsesorCrmEnCentroInformacionService = {
	createAsesorCrmEnCentroInformacion(
		data: ICreateAsesorCrmEnCentroInformacion,
	): Promise<number>;
	// getAllAsesorCrmEnCentroInformacions(): Promise<
	// 	IAsesorCrmEnCentroInformacion[]
	// >;
	// getAsesorCrmEnCentroInformacionById(
	// 	id: string,
	// ): Promise<IAsesorCrmEnCentroInformacion | null>;
	updateAsesorCrmEnCentroInformacionById(
		params: IUpdateAsesorCrmEnCentroInformacion,
	): Promise<number>;
	// deleteAsesorCrmEnCentroInformacionById(
	// 	id: string,
	// ): Promise<IAsesorCrmEnCentroInformacion>;
};
