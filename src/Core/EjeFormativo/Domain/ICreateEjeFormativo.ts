import type { IEjeFormativo } from "./IEjeFormativo";

export type ICreateEjeFormativo = Omit<IEjeFormativo, "enUso" | "id">;
