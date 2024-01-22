import type { IAlternativaEvaluacion } from "./IAlternativaEvaluacion";

export type ICreateAlternativaEvaluacion = Omit<
	IAlternativaEvaluacion,
	"id" | "enUso"
>;
