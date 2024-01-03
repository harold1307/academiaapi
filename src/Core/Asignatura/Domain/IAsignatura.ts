import type { Asignatura } from "@prisma/client";

export type IAsignatura = Asignatura;

export type IAsignaturaWithIsUsed = IAsignatura & {
	enUso: boolean;
};
