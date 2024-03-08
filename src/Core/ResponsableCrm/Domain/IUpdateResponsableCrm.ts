import type { IResponsableCrm } from "./IResponsableCrm";

export type IUpdateResponsableCrm = Partial<
	Omit<
		IResponsableCrm,
		"id" | "createdAt" | "updatedAt" | "administrativo" | "administrativoId"
	>
>;
