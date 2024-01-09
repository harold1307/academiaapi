import type { LugarEjecucion } from "@prisma/client";

import type { IInstitucion } from "../../Institucion/Domain/IInstitucion";

export type ILugarEjecucion = LugarEjecucion & {
	institucion: IInstitucion;
};
