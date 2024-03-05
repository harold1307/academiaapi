import type { IAsesorEstudiante } from "./IAsesorEstudiante";

export type ICreateAsesorEstudiante = Omit<
	IAsesorEstudiante,
	| "id"
	| "administrativo"
	| "estudiantesCount"
	| "createdAt"
	| "updatedAt"
	| "estado"
>;
