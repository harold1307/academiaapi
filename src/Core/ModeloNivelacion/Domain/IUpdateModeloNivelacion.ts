import type { IModeloNivelacion } from "./IModeloNivelacion";

export type IUpdateModeloNivelacion = Partial<
	Omit<IModeloNivelacion, "enUso" | "id" | "createdAt" | "updatedAt">
>;
