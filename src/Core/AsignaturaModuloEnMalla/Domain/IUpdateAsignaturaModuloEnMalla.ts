import type { ICreateAsignaturaModuloEnMalla } from "./ICreateAsignaturaModuloEnMalla";

export type IUpdateAsignaturaModuloEnMalla = Partial<
	Omit<ICreateAsignaturaModuloEnMalla, "asignaturaId" | "mallaId">
>;
