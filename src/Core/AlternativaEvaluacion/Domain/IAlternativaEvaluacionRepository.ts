import type { IAlternativaEvaluacion } from "./IAlternativaEvaluacion";
import type { ICreateAlternativaEvaluacion } from "./ICreateAlternativaEvaluacion";
import type { IUpdateAlternativaEvaluacion } from "./IUpdateAlternativaEvaluacion";

export type IUpdateAlternativaEvaluacionParams = {
	id: string;
	data: IUpdateAlternativaEvaluacion;
};

export type IAlternativaEvaluacionRepository = {
	create(data: ICreateAlternativaEvaluacion): Promise<IAlternativaEvaluacion>;
	getAll(): Promise<IAlternativaEvaluacion[]>;
	getById(id: string): Promise<IAlternativaEvaluacion | null>;
	update(
		params: IUpdateAlternativaEvaluacionParams,
	): Promise<IAlternativaEvaluacion>;
	deleteById(id: string): Promise<IAlternativaEvaluacion>;
};
