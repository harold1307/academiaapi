import type { ICreatePracticaComunitariaEnMalla } from "./ICreatePracticaComunitariaEnMalla";

export type IUpdatePracticaComunitariaEnMalla = Partial<
	Omit<ICreatePracticaComunitariaEnMalla, "mallaCurricularId">
> & {
	mallaCurricularId: string;
};
