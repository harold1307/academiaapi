import type { $Enums } from "@prisma/client";

export type ICreateCompetencia = {
	tipo: $Enums.TipoCompetencia;
	nombre: string;
	asignaturaEnMallaId: string | null;
};
