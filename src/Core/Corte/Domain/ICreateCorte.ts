import type { ICorte } from "./ICorte";

export type ICreateCorte = Omit<
	ICorte,
	"id" | "createdAt" | "updatedAt" | "enUso"
>;
