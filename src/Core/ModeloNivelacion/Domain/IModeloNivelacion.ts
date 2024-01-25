import type { ModeloNivelacion } from "@prisma/client";

export type IModeloNivelacion = ModeloNivelacion & {
	enUso: boolean;
};
