import type { ICreateCampoProyectoIntegrador } from "./ICreateCampoProyectoIntegrador";

export type IUpdateCampoProyectoIntegrador = Partial<
	Omit<ICreateCampoProyectoIntegrador, "proyectoIntegradorId">
>;
