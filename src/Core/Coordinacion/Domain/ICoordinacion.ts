import type { Coordinacion } from "@prisma/client";

export type ICoordinacion = Coordinacion & {
	enUso: boolean;
};
