import type { IResponsableEnAsesorEstudiante } from "./IResponsableEnAsesorEstudiante";

export type ICreateResponsableEnAsesorEstudiante = Omit<
	IResponsableEnAsesorEstudiante,
	"id" | "createdAt" | "updatedAt"
>;
