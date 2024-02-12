import type { Sede } from "@prisma/client";

export type ISede = Sede & {
	enUso: boolean;
};
