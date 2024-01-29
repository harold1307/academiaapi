import type { NivelTitulacion } from "@prisma/client";

export type INivelTitulacion = NivelTitulacion & {
	enUso: boolean;
};
