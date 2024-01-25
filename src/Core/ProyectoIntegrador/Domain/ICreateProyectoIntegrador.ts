import type { IProyectoIntegrador } from "./IProyectoIntegrador";

export type ICreateProyectoIntegrador = Omit<
	IProyectoIntegrador,
	"id" | "enUso" | "estado"
>;
