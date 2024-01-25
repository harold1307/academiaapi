import type { ProyectoIntegrador } from "@prisma/client";

export type IProyectoIntegrador = ProyectoIntegrador & {
	enUso: boolean;
};
