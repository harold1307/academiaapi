import type { AsignaturaEnNivelMalla } from "@prisma/client";
import type { IAreaConocimiento } from "../../AreaConocimiento/Domain/IAreaConocimiento";
import type { IAsignatura } from "../../Asignatura/Domain/IAsignatura";
import type { ICampoFormacion } from "../../CampoFormacion/Domain/ICampoFormacion";
import type { IEjeFormativo } from "../../EjeFormativo/Domain/IEjeFormativo";

export type IAsignaturaEnNivelMalla = AsignaturaEnNivelMalla & {
	ejeFormativo: IEjeFormativo;
	areaConocimiento: IAreaConocimiento;
	campoFormacion: ICampoFormacion | null;
	asignatura: IAsignatura;
};
