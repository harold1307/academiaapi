import type { AlternativaEvaluacion } from "@prisma/client";

export type IAlternativaEvaluacion = AlternativaEvaluacion & {
	enUso: boolean;
};
