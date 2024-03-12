import type { NivelAcademico } from "@prisma/client";
import type { INivelMalla } from "../../NivelMalla/Domain/INivelMalla";
import type { ISesion } from "../../Sesion/Domain/ISesion";

export type INivelAcademico = NivelAcademico & {
	sesion: ISesion;
	nivelMalla: Omit<INivelMalla, "enUso" | "malla">;
};
