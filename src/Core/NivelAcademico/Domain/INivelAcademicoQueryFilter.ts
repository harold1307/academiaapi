import type { INivelAcademico } from "./INivelAcademico";

export type INivelAcademicoQueryFilter = Partial<
	Omit<INivelAcademico, "sesion" | "id" | "createdAt" | "updatedAt"> & {
		mallaId: string;
	}
>;
