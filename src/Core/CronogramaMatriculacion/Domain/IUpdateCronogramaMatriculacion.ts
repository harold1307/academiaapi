import type { ICreateCronogramaMatriculacion } from "./ICreateCronogramaMatriculacion";

export type IUpdateCronogramaMatriculacion = Partial<
	Omit<ICreateCronogramaMatriculacion, "periodoId" | "nivelId">
>;
