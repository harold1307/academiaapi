import type { ICurso } from "./ICurso";

export type ICreateCurso = Omit<
	ICurso,
	"id" | "estado" | "createdAt" | "updatedAt" | "variantesCount"
>;
