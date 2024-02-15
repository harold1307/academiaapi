import type { CronogramaMatriculacion } from "@prisma/client";

import type { IModalidad } from "../../Modalidad/Domain/IModalidad";
import type { INivelMalla } from "../../NivelMalla/Domain/INivelMalla";
import type { IPrograma } from "../../Programa/Domain/IPrograma";
import type { ISede } from "../../Sede/Domain/ISede";

export type ICronogramaMatriculacion = CronogramaMatriculacion & {
	sede: Omit<ISede, "enUso">;
	programa: Omit<
		IPrograma,
		"enUso" | "nivelTitulacion" | "detalleNivelTitulacion"
	>;
	modalidad: Omit<IModalidad, "enUso">;
	nivel: Omit<INivelMalla, "enUso" | "malla">;
};
