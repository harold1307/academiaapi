import type { PerfilPractica } from "@prisma/client";

export type IPerfilPractica = PerfilPractica & {
	enUso: boolean;
};
