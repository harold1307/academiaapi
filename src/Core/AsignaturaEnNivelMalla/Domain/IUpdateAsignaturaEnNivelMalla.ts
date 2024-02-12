import type { ICreateAsignaturaEnNivelMalla } from "./ICreateAsignaturaEnNivelMalla";

export type IUpdateAsignaturaEnNivelMalla = Partial<
	Omit<ICreateAsignaturaEnNivelMalla, "nivelMallaId" | "asignaturaId">
>;
