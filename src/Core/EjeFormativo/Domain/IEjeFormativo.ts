import type { EjeFormativo } from "@prisma/client";

export type IEjeFormativo = EjeFormativo & {
	enUso: boolean;
};
