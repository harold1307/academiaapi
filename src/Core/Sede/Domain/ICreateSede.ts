import type { ISede } from "./ISede";

export type ICreateSede = Omit<
	ISede,
	"id" | "enUso" | "createdAt" | "updatedAt"
>;
