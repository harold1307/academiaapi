import type { ICreateDetalleNivelTitulacion } from "./ICreateDetalleNivelTitulacion";
import type { IDetalleNivelTitulacion } from "./IDetalleNivelTitulacion";
import type { UpdateDetalleNivelTitulacionParams } from "./IDetalleNivelTitulacionRepository";

export type IDetalleNivelTitulacionService = {
	createDetalleNivelTitulacion(
		data: ICreateDetalleNivelTitulacion,
	): Promise<IDetalleNivelTitulacion>;
	getAllDetallesNivelTitulacion(): Promise<IDetalleNivelTitulacion[]>;
	getDetalleNivelTitulacionById(
		id: string,
	): Promise<IDetalleNivelTitulacion | null>;
	updateDetalleNivelTitulacionById(
		params: UpdateDetalleNivelTitulacionParams,
	): Promise<IDetalleNivelTitulacion>;
	deleteDetalleNivelTitulacionById(
		id: string,
	): Promise<IDetalleNivelTitulacion>;
};
