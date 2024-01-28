import type { IModeloNivelacion } from "./IModeloNivelacion";

export type ICreateModeloNivelacion = Omit<
	IModeloNivelacion,
	"enUso" | "id" | "estado" | "createdAt" | "updatedAt"
>;
