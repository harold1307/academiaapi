import type { ICampoModeloEvaluativo } from "./ICampoModeloEvaluativo";
import type { ICreateCampoModeloEvaluativo } from "./ICreateCampoModeloEvaluativo";
import type { IUpdateCampoModeloEvaluativo } from "./IUpdateCampoModeloEvaluativo";

export type IUpdateCampoModeloEvaluativoParams = {
	id: string;
	data: IUpdateCampoModeloEvaluativo;
};

export type ICampoModeloEvaluativoRepository = {
	create(data: ICreateCampoModeloEvaluativo): Promise<ICampoModeloEvaluativo>;
	getAll(): Promise<ICampoModeloEvaluativo[]>;
	getById(id: string): Promise<ICampoModeloEvaluativo | null>;
	update(
		params: IUpdateCampoModeloEvaluativoParams,
	): Promise<ICampoModeloEvaluativo>;
	deleteById(id: string): Promise<ICampoModeloEvaluativo>;
};
