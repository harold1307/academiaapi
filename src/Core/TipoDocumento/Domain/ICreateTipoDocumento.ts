import type { ITipoDocumento } from "./ITipoDocumento";

export type ICreateTipoDocumento = Omit<
	ITipoDocumento,
	"id" | "enUso" | "createdAt" | "updatedAt"
>;
