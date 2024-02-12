import type { MateriaEnNivelAcademico } from "@prisma/client";

import type { IAsignaturaEnNivelMalla } from "../../AsignaturaEnNivelMalla/Domain/IAsignaturaEnNivelMalla";
import type { IAsignaturaModuloEnMalla } from "../../AsignaturaModuloEnMalla/Domain/IAsignaturaModuloEnMalla";
import type { IModeloEvaluativo } from "../../ModeloEvaluativo/Domain/IModeloEvaluativo";

export type IMateriaEnNivelAcademico = MateriaEnNivelAcademico & {
	asignaturaEnNivelMalla: Omit<
		IAsignaturaEnNivelMalla,
		"ejeFormativo" | "areaConocimiento" | "campoFormacion"
	> | null;
	asignaturaModulo: Omit<
		IAsignaturaModuloEnMalla,
		"areaConocimiento" | "campoFormacion"
	> | null;
	modeloEvaluativo: IModeloEvaluativo;
};
