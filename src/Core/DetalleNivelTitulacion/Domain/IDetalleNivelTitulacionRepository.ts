import type { ICreateDetalleNivelTitulacion } from "./ICreateDetalleNivelTitulacion";
import type { IDetalleNivelTitulacion } from "./IDetalleNivelTitulacion";
import type { IUpdateDetalleNivelTitulacion } from "./IUpdateDetalleNivelTitulacion";

export type UpdateDetalleNivelTitulacionParams = {
	id: string;
	data: IUpdateDetalleNivelTitulacion;
};

export type IDetalleNivelTitulacionRepository = {
	create(data: ICreateDetalleNivelTitulacion): Promise<IDetalleNivelTitulacion>;
	getAll(): Promise<IDetalleNivelTitulacion[]>;
	getById(id: string): Promise<IDetalleNivelTitulacion | null>;
	update(
		params: UpdateDetalleNivelTitulacionParams,
	): Promise<IDetalleNivelTitulacion>;
	deleteById(id: string): Promise<IDetalleNivelTitulacion>;
};
