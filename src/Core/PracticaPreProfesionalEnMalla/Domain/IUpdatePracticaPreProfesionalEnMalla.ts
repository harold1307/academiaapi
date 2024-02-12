import type { ICreatePracticaPreProfesionalEnMalla } from "./ICreatePracticaPreProfesionalEnMalla";

export type IUpdatePracticaPreProfesionalEnMalla = Partial<
	Omit<ICreatePracticaPreProfesionalEnMalla, "mallaCurricularId">
> & {
	mallaCurricularId: string;
};
