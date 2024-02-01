import type { IMallaCurricular } from "./IMallaCurricular";

export type IUpdateMallaCurricular = Partial<
	Omit<
		IMallaCurricular,
		"id" | "createdAt" | "updatedAt" | "enUso" | "programaId" | "modalidadId"
	>
>;
