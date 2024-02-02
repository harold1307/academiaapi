import type { Curso } from "@prisma/client";

export type ICurso = Curso & {
	variantesCount: number;
};
