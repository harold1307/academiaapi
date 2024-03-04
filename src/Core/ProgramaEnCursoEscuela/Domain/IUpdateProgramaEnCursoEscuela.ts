import type { ICreateProgramaEnCursoEscuela } from "./ICreateProgramaEnCursoEscuela";

export type IUpdateProgramaEnCursoEscuela = Partial<
	Omit<ICreateProgramaEnCursoEscuela, "cursoEscuelaId">
>;
