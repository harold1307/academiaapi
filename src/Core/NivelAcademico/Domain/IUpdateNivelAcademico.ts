import type { INivelAcademico } from "./INivelAcademico";

export type IUpdateNivelAcademico = Partial<
	Omit<
		INivelAcademico,
		"createdAt" | "updatedAt" | "nivelMallaId" | "sesionId" | "id"
	>
>;
