import type { IResponsableCrm } from "./IResponsableCrm";

export type ICreateResponsableCrm = Omit<
	IResponsableCrm,
	"id" | "createdAt" | "updatedAt" | "administrativo" | "estado"
>;
