import type { IAsignaturaEnCursoEscuela } from "./IAsignaturaEnCursoEscuela";

export type ICreateAsignaturaEnCursoEscuela = Omit<
	IAsignaturaEnCursoEscuela,
	"id" | "createdAt" | "updatedAt"
>;
