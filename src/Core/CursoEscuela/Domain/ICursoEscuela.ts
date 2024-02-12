import type { CursoEscuela } from "@prisma/client";

export type ICursoEscuela = CursoEscuela & {
	enUso: boolean;
};
