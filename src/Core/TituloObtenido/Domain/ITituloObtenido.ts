import type { TituloObtenido } from "@prisma/client";

export type ITituloObtenido = TituloObtenido & {
	enUso: boolean;
};
