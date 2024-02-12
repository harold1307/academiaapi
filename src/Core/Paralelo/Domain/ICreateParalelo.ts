import type { IParalelo } from "./IParalelo";

export type ICreateParalelo = Omit<
	IParalelo,
	"id" | "enUso" | "createdAt" | "updatedAt"
>;
