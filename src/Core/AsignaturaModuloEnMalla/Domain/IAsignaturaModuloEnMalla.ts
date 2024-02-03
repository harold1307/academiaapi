import type { AsignaturaModuloEnMalla } from "@prisma/client";
import type { IAreaConocimiento } from "../../AreaConocimiento/Domain/IAreaConocimiento";
import type { IAsignatura } from "../../Asignatura/Domain/IAsignatura";
import type { ICampoFormacion } from "../../CampoFormacion/Domain/ICampoFormacion";

export type IAsignaturaModuloEnMalla = AsignaturaModuloEnMalla & {
	asignatura: IAsignatura;
	areaConocimiento: IAreaConocimiento;
	campoFormacion: ICampoFormacion;
};
