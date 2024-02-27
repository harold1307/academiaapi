import type { ICursoEscuela } from "./ICursoEscuela";

export type ICreateCursoEscuela = Omit<
	ICursoEscuela,
	"id" | "createdAt" | "updatedAt" | "enUso" | "estado"
>;
