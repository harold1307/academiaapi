import type { CentroInformacion } from "@prisma/client";

export type ICentroInformacion = CentroInformacion & {
	enUso: boolean;
};
