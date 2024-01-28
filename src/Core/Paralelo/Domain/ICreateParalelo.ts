import type { IParalelo } from "./IParalelo";

export type ICreateParalelo = Omit<
	IParalelo,
	"enUso" | "createdAt" | "updatedAt"
>;
