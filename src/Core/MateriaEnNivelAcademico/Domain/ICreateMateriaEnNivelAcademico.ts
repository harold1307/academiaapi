import type { IMateriaEnNivelAcademico } from "./IMateriaEnNivelAcademico";

export type ICreateMateriaEnNivelAcademico = Pick<
	IMateriaEnNivelAcademico,
	"modeloEvaluativoId" | "nivelAcademicoId"
> & {
	asignaturasMalla: string[];
	modulosMalla: string[];
};
