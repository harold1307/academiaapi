import type { ICentroInformacion } from "./ICentroInformacion";

export type IUpdateCentroInformacion = Partial<
	Omit<ICentroInformacion, "id" | "createdAt" | "updatedAt" | "enUso">
>;
