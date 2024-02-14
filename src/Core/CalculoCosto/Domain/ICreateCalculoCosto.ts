import type { ICalculoCosto } from "./ICalculoCosto";

export type ICreateCalculoCosto = Omit<
	ICalculoCosto,
	"id" | "createdAt" | "updatedAt"
>;
