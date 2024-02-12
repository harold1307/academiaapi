import type { DetalleNivelTitulacion } from "@prisma/client";

export type IDetalleNivelTitulacion = DetalleNivelTitulacion & {
	enUso: boolean;
};
