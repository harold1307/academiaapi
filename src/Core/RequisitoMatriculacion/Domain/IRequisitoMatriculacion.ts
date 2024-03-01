import type { RequisitoMatriculacion } from "@prisma/client";

import type { IModalidad } from "../../Modalidad/Domain/IModalidad";
import type { IPrograma } from "../../Programa/Domain/IPrograma";
import type { ISede } from "../../Sede/Domain/ISede";
import type { ITipoDocumento } from "../../TipoDocumento/Domain/ITipoDocumento";

export type IRequisitoMatriculacion = RequisitoMatriculacion & {
	sede: Omit<ISede, "enUso">;
	programa: Omit<
		IPrograma,
		"enUso" | "nivelTitulacion" | "detalleNivelTitulacion"
	> | null;
	modalidad: Omit<IModalidad, "enUso"> | null;
	tipoDocumento: Omit<ITipoDocumento, "enUso">;
};
