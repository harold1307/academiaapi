import type { ICreateModeloEvaluativo } from "./ICreateModeloEvaluativo";
import type { IModeloEvaluativo } from "./IModeloEvaluativo";
import type { IUpdateModeloEvaluativoParams } from "./IModeloEvaluativoRepository";

export type IModeloEvaluativoService = {
	createModeloEvaluativo(
		data: ICreateModeloEvaluativo,
	): Promise<IModeloEvaluativo>;
	getAllModeloEvaluativos(): Promise<IModeloEvaluativo[]>;
	getModeloEvaluativoById(id: string): Promise<IModeloEvaluativo | null>;
	updateModeloEvaluativoById(
		params: IUpdateModeloEvaluativoParams,
	): Promise<IModeloEvaluativo>;
	deleteModeloEvaluativoById(id: string): Promise<IModeloEvaluativo>;
};
