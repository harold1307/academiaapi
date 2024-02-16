import type { ICronogramaMatriculacion } from "./ICronogramaMatriculacion";

export type ICreateCronogramaMatriculacion = Omit<
	ICronogramaMatriculacion,
	"id" | "createdAt" | "updatedAt" | "sede" | "programa" | "modalidad" | "nivel"
>;