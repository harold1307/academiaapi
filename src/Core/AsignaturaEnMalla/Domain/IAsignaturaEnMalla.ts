import type { AsignaturaEnMalla } from "@prisma/client";
import type { IEjeFormativo } from "../../EjeFormativo/Domain/IEjeFormativo";
import type { IAreaConocimiento } from "../../AreaConocimiento/Domain/IAreaConocimiento";
import type { ICampoFormacion } from "../../CampoFormacion/Domain/ICampoFormacion";

export type IAsignaturaEnMalla = AsignaturaEnMalla & {
	ejeFormativo: IEjeFormativo | null;
	areaConocimiento: IAreaConocimiento | null;
	campoFormacion: ICampoFormacion | null;
};
