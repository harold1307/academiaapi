import type { Modalidad } from "@prisma/client";

export type IModalidad = Modalidad & {
	enUso: boolean;
};
