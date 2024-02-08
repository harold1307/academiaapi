import type { NivelMalla } from "@prisma/client";

export type INivelMalla = NivelMalla & {
	enUso: boolean;
};
