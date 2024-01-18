import type { Sesion } from "@prisma/client";

export type ISesion = Sesion & {
	enUso: boolean;
};
