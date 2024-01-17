import type { Paralelo } from "@prisma/client";

export type IParalelo = Paralelo & {
	enUso: boolean;
};
