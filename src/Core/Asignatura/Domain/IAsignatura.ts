import type { Asignatura } from "@prisma/client";

export type IAsignatura = Asignatura & {
	enUso: boolean;
};
