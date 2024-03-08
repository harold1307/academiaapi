import type { IProgramaEnCursoEscuela } from "./IProgramaEnCursoEscuela";

export type ICreateProgramaEnCursoEscuela = Omit<
	IProgramaEnCursoEscuela,
	"id" | "createdAt" | "updatedAt"
>;
