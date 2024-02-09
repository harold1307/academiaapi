import type { Turno } from "@prisma/client";
import type { ISesion } from "../../Sesion/Domain/ISesion";

export type ITurno = Turno & {
	enUso: boolean;
	sesion: ISesion;
};
