import type { ICampoProyectoIntegrador } from "./ICampoProyectoIntegrador";

export type ICreateCampoProyectoIntegrador = Omit<
	ICampoProyectoIntegrador,
	"id" | "createdAt" | "updatedAt"
>;
