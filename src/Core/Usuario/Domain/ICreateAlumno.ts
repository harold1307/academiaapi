import type { Alumno } from "@prisma/client";

export type ICreateAlumno = Omit<
	Alumno,
	"id" | "createdAt" | "updatedAt" | "estado" | "usuarioId"
> & {
	nivelAcademicoId: string;
};
