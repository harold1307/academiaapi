import type { IMateriaEnNivelAcademico } from "../../MateriaEnNivelAcademico/Domain/IMateriaEnNivelAcademico";
import type { INivelAcademico } from "./INivelAcademico";

export type INivelAcademicoWithMaterias = INivelAcademico & {
	materias: IMateriaEnNivelAcademico[];
};
