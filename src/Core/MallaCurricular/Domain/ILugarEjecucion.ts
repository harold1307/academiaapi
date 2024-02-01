import type { LugarEjecucion } from "@prisma/client";

import type { ISede } from "../../Sede/Domain/ISede";

export type ILugarEjecucion = LugarEjecucion & {
	sede: ISede;
};
