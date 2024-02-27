import type { ICursoEscuela } from "./ICursoEscuela";

export type IUpdateCursoEscuela = Partial<
	Omit<
		ICursoEscuela,
		"plantillaId" | "id" | "createdAt" | "updatedAt" | "enUso" | "periodoId"
	>
>;
