import type { INivelAcademico } from "./INivelAcademico";

export type ICreateNivelAcademico = Omit<
	INivelAcademico,
	| "profesores"
	| "horarios"
	| "cuposMaterias"
	| "planificacionProfesores"
	| "matriculacion"
	| "estado"
	| "createdAt"
	| "updatedAt"
	| "id"
	| "sesion"
>;
