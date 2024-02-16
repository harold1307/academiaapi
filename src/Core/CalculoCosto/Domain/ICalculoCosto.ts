import type { CalculoCosto } from "@prisma/client";

export type ICalculoCosto = CalculoCosto & {
	planCostos: boolean;
};
