import type { Turno } from "@prisma/client";

export type ITurno = Turno & {
	enUso: boolean;
};
