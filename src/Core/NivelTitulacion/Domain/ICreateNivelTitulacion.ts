import type { INivelTitulacion } from "./INivelTitulacion";

export type ICreateNivelTitulacion = Omit<
	INivelTitulacion,
	"enUso" | "createdAt" | "updatedAt" | "id"
>;
