import type { NivelAcademico } from "@prisma/client";
import type { ISesion } from "../../Sesion/Domain/ISesion";

export type INivelAcademico = NivelAcademico & {
	sesion: ISesion;
};
