import type { Grupo } from "@prisma/client";

export type IGrupo = Grupo & {
	enUso: boolean;
	usuarios: number;
	activos: number;
	inactivos: number;
};
