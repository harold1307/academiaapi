import type { NivelMalla } from "@prisma/client";
import type { IMallaCurricular } from "../../MallaCurricular/Domain/IMallaCurricular";

export type INivelMalla = NivelMalla & {
	enUso: boolean;
	malla: Omit<
		IMallaCurricular,
		| "practicaPreProfesional"
		| "practicaComunitaria"
		| "tituloObtenido"
		| "niveles"
		| "asignaturas"
		| "modulos"
	>;
};
