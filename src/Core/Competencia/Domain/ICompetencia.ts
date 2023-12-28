import type { $Enums } from "@prisma/client";

export type ICompetencia = {
	id: string;
	tipo: $Enums.TipoCompetencia;
	nombre: string;
	asignaturaEnMallaId: string | null;
};
