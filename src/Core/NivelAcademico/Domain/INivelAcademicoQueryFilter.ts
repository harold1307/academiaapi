import type { NonNullableObject } from "../../../types";
import type { INivelAcademico } from "./INivelAcademico";

export type INivelAcademicoQueryFilter = Partial<
	NonNullableObject<
		Omit<INivelAcademico, "sesion" | "id" | "createdAt" | "updatedAt"> & {
			mallaId: string;
			programaId: string;
		}
	>
>;
