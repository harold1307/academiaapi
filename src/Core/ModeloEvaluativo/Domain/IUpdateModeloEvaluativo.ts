import type { IModeloEvaluativo } from "./IModeloEvaluativo";

export type IUpdateModeloEvaluativo = Partial<
	Omit<IModeloEvaluativo, "id" | "enUso" | "createdAt" | "updatedAt">
>;
