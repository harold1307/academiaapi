import type { MallaCurricular } from "@prisma/client";

import type { IAsignaturaEnNivelMalla } from "../../AsignaturaEnNivelMalla/Domain/IAsignaturaEnNivelMalla";
import type { IAsignaturaModuloEnMalla } from "../../AsignaturaModuloEnMalla/Domain/IAsignaturaModuloEnMalla";
import type { INivelMalla } from "../../NivelMalla/Domain/INivelMalla";
import type { IPracticaComunitariaEnMalla } from "../../PracticaComunitariaEnMalla/Domain/IPracticaComunitariaEnMalla";
import type { IPracticaPreProfesionalEnMalla } from "../../PracticaPreProfesionalEnMalla/Domain/IPracticaPreProfesionalEnMalla";
import type { ITituloObtenido } from "../../TituloObtenido/Domain/ITituloObtenido";

export type IMallaCurricular = MallaCurricular & {
	enUso: boolean;
	practicaPreProfesional: IPracticaPreProfesionalEnMalla | null;
	practicaComunitaria: IPracticaComunitariaEnMalla | null;
	tituloObtenido: ITituloObtenido | null;
	niveles: (Omit<INivelMalla, "malla"> & {
		asignaturas: IAsignaturaEnNivelMalla[];
	})[];
	modulos: Omit<
		IAsignaturaModuloEnMalla,
		"areaConocimiento" | "campoFormacion"
	>[];
};
