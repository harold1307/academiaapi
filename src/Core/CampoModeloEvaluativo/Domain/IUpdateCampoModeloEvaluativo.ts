import type { ICreateCampoModeloEvaluativo } from "./ICreateCampoModeloEvaluativo";

export type IUpdateCampoModeloEvaluativo = Partial<
	Omit<ICreateCampoModeloEvaluativo, "modeloEvaluativoId">
>;
