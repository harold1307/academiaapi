import type { IDetalleNivelTitulacion } from "./IDetalleNivelTitulacion";

export type ICreateDetalleNivelTitulacion = Omit<
	IDetalleNivelTitulacion,
	"id" | "createdAt" | "updatedAt" | "enUso"
>;
