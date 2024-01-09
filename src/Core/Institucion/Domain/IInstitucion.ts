import type { Institucion } from "@prisma/client";

export type IInstitucion = Institucion & {
	enUso: boolean;
};
