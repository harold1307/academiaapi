import type { RequisitoMatriculacion } from "@prisma/client";

import type { ISede } from "../../Sede/Domain/ISede";
import type { IPrograma } from "../../Programa/Domain/IPrograma";
import type { IModalidad } from "../../Modalidad/Domain/IModalidad";
import type { INivelMalla } from "../../NivelMalla/Domain/INivelMalla";

export type IRequisitoMatriculacion = RequisitoMatriculacion & {
	sede: Omit<ISede, "enUso">;
	programa: Omit<
		IPrograma,
		"enUso" | "nivelTitulacion" | "detalleNivelTitulacion"
	>;
	modalidad: Omit<IModalidad, "enUso">;
	nivel: Omit<INivelMalla, "enUso" | "malla">;
};
