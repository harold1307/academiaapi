import type { AsignaturaEnMalla } from "@prisma/client";

export type IAsignaturaEnMalla = Omit<AsignaturaEnMalla, "createdAt"> & {
	createdAt: string;
};
