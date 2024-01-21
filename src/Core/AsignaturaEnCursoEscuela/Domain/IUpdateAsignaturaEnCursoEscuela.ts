import type { ICreateAsignaturaEnCursoEscuela } from "./ICreateAsignaturaEnCursoEscuela";

export type IUpdateAsignaturaEnCursoEscuela = Partial<
	Omit<ICreateAsignaturaEnCursoEscuela, "cursoEscuelaId">
>;
