import type { ModeloEvaluativo } from "@prisma/client";

export type IModeloEvaluativo = ModeloEvaluativo & {
	enUso: boolean;
};
