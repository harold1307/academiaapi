import type { IProyectoIntegrador } from "./IProyectoIntegrador";

export type IUpdateProyectoIntegrador = Partial<
	Omit<IProyectoIntegrador, "id" | "enUso">
>;
