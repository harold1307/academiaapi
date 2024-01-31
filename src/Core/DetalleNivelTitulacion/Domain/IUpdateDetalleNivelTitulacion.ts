import type { ICreateDetalleNivelTitulacion } from "./ICreateDetalleNivelTitulacion";

export type IUpdateDetalleNivelTitulacion = Partial<
	Omit<ICreateDetalleNivelTitulacion, "nivelTitulacionId">
>;
