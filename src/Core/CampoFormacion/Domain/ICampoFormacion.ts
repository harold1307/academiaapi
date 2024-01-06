import type { CampoFormacion } from "@prisma/client";

export type ICampoFormacion = CampoFormacion & {
	enUso: boolean;
};
