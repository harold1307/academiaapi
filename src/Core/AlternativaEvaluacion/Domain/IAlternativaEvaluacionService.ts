import type { IAlternativaEvaluacion } from "./IAlternativaEvaluacion";
import type { IUpdateAlternativaEvaluacionParams } from "./IAlternativaEvaluacionRepository";
import type { ICreateAlternativaEvaluacion } from "./ICreateAlternativaEvaluacion";

export type IAlternativaEvaluacionService = {
	createAlternativaEvaluacion(
		data: ICreateAlternativaEvaluacion,
	): Promise<IAlternativaEvaluacion>;
	getAllAlternativasEvaluacion(): Promise<IAlternativaEvaluacion[]>;
	getAlternativaEvaluacionById(
		id: string,
	): Promise<IAlternativaEvaluacion | null>;
	updateAlternativaEvaluacionById(
		params: IUpdateAlternativaEvaluacionParams,
	): Promise<IAlternativaEvaluacion>;
	deleteAlternativaEvaluacionById(id: string): Promise<IAlternativaEvaluacion>;
};
