import type { Profesor } from "@prisma/client";

export type IUpdateProfesor = Partial<
	Omit<Profesor, "id" | "createdAt" | "updatedAt" | "usuarioId">
>;
