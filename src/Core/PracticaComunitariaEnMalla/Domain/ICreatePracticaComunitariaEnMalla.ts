import type { IPracticaComunitariaEnMalla } from "./IPracticaComunitariaEnMalla";

export type ICreatePracticaComunitariaEnMalla = Omit<
	IPracticaComunitariaEnMalla,
	"id" | "createdAt" | "updatedAt"
>;
