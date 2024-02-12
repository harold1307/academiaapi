import type { MateriaEnHorario } from "@prisma/client";

export type ICreateMateriaEnHorario = Omit<
	MateriaEnHorario,
	"id" | "createdAt" | "updatedAt" | "ubicacion" | "turno" | "nivelAcademico"
>;
