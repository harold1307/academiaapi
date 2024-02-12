import type { Programa } from "@prisma/client";
import type { IDetalleNivelTitulacion } from "../../DetalleNivelTitulacion/Domain/IDetalleNivelTitulacion";
import type { INivelTitulacion } from "../../NivelTitulacion/Domain/INivelTitulacion";

export type IPrograma = Programa & {
	enUso: boolean;
	nivelTitulacion: Omit<INivelTitulacion, "enUso">;
	detalleNivelTitulacion: Omit<IDetalleNivelTitulacion, "enUso">;
};
