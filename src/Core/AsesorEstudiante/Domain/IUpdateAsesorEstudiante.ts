import type { ICreateAsesorEstudiante } from "./ICreateAsesorEstudiante";

export type IUpdateAsesorEstudiante = Partial<
	Omit<ICreateAsesorEstudiante, "administrativoId">
>;
