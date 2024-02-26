import type { Alumno } from "@prisma/client";

export type IUpdateAlumno = Partial<
	Omit<Alumno, "id" | "createdAt" | "updatedAt" | "usuarioId">
>;
