import type { Administrativo } from "@prisma/client";

export type IUpdateAdministrativo = Partial<
	Omit<Administrativo, "id" | "createdAt" | "updatedAt" | "usuarioId">
>;
