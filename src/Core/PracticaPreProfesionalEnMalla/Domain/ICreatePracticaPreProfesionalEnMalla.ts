import type { IPracticaPreProfesionalEnMalla } from "./IPracticaPreProfesionalEnMalla";

export type ICreatePracticaPreProfesionalEnMalla = Omit<
	IPracticaPreProfesionalEnMalla,
	"id" | "createdAt" | "updatedAt" | "registroDesdeNivelId"
> & {
	registroDesdeNivel: number | null;
};
