import type { ISede } from "./ISede";

export type IUpdateSede = Partial<
	Omit<ISede, "id" | "enUso" | "createdAt" | "updatedAt">
>;
