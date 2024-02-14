import type { Corte } from "@prisma/client";

export type ICorte = Corte & {
	enUso: boolean;
};
