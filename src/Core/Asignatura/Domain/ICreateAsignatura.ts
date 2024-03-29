import type { IAsignatura } from "./IAsignatura";

export type ICreateAsignatura = Omit<
	IAsignatura,
	"id" | "enUso" | "createdAt" | "updatedAt"
>;
