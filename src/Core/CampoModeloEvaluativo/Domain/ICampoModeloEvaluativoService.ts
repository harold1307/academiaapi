import type { ICampoModeloEvaluativo } from "./ICampoModeloEvaluativo";
import type { IUpdateCampoModeloEvaluativoParams } from "./ICampoModeloEvaluativoRepository";
import type { ICreateCampoModeloEvaluativo } from "./ICreateCampoModeloEvaluativo";

export type ICampoModeloEvaluativoService = {
	createCampoModeloEvaluativo(
		data: ICreateCampoModeloEvaluativo,
	): Promise<ICampoModeloEvaluativo>;
	getAllCamposModelosEvaluativos(): Promise<ICampoModeloEvaluativo[]>;
	getCampoModeloEvaluativoById(
		id: string,
	): Promise<ICampoModeloEvaluativo | null>;
	updateCampoModeloEvaluativoById(
		params: IUpdateCampoModeloEvaluativoParams,
	): Promise<ICampoModeloEvaluativo>;
	deleteCampoModeloEvaluativoById(id: string): Promise<ICampoModeloEvaluativo>;
};
