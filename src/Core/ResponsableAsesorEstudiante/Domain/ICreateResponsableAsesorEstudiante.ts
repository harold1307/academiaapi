import type { IResponsableAsesorEstudiante } from "./IResponsableAsesorEstudiante";

export type ICreateResponsableAsesorEstudiante = Omit<
	IResponsableAsesorEstudiante,
	"administrativo" | "id" | "createdAt" | "updatedAt" | "asesoresCount"
>;
