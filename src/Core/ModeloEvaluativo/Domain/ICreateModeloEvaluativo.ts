import type { IModeloEvaluativo } from "./IModeloEvaluativo";

export type ICreateModeloEvaluativo = Omit<
	IModeloEvaluativo,
	"id" | "enUso" | "estado" | "createdAt" | "updatedAt"
>;
