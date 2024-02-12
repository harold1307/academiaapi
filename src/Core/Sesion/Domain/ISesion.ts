import type { Sesion } from "@prisma/client";

import type { ISede } from "../../Sede/Domain/ISede";
import type { ITurno } from "../../Turno/Domain/ITurno";

export type ISesion = Sesion & {
	enUso: boolean;
	turnos: Omit<ITurno, "sesion">[];
	sede: ISede;
};
