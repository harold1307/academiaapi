import type { Profesor } from "@prisma/client";

export type ICreateProfesor = Omit<
	Profesor,
	"id" | "createdAt" | "updatedAt" | "estado" | "usuarioId"
>;
