import type { MallaCurricular } from "@prisma/client";
import type { IPracticaComunitariaEnMalla } from "../../PracticaComunitariaEnMalla/Domain/IPracticaComunitariaEnMalla";
import type { IPracticaPreProfesionalEnMalla } from "../../PracticaPreProfesionalEnMalla/Domain/IPracticaPreProfesionalEnMalla";
import type { ITituloObtenido } from "../../TituloObtenido/Domain/ITituloObtenido";

export type IMallaCurricular = MallaCurricular & {
	enUso: boolean;
	practicaPreProfesional: IPracticaPreProfesionalEnMalla | null;
	practicaComunitaria: IPracticaComunitariaEnMalla | null;
	tituloObtenido: ITituloObtenido | null;
};
