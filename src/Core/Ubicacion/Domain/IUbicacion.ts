import type { Ubicacion } from "@prisma/client";

export type IUbicacion = Ubicacion & {
	enUso: boolean;
};
