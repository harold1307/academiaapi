import type { ICreateModeloEvaluativo } from "./ICreateModeloEvaluativo";
import type { IModeloEvaluativo } from "./IModeloEvaluativo";
import type { IUpdateModeloEvaluativo } from "./IUpdateModeloEvaluativo";

export type IUpdateModeloEvaluativoParams = {
	id: string;
	data: IUpdateModeloEvaluativo;
};

export type IModeloEvaluativoRepository = {
	create(data: ICreateModeloEvaluativo): Promise<IModeloEvaluativo>;
	getAll(): Promise<IModeloEvaluativo[]>;
	getById(id: string): Promise<IModeloEvaluativo | null>;
	update(params: IUpdateModeloEvaluativoParams): Promise<IModeloEvaluativo>;
	deleteById(id: string): Promise<IModeloEvaluativo>;
};
