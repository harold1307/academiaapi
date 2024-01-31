import type { ITituloObtenido } from "./ITituloObtenido";

export type ICreateTituloObtenido = Omit<
	ITituloObtenido,
	"id" | "enUso" | "createdAt" | "updatedAt"
>;
