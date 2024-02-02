import type { ICreateCursoEscuela } from "./ICreateCursoEscuela";

export type IUpdateCursoEscuela = Partial<
	Omit<ICreateCursoEscuela, "plantillaId">
>;
