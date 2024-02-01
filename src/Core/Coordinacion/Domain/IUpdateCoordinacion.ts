import type { ICreateCoordinacion } from "./ICreateCoordinacion";

export type IUpdateCoordinacion = Partial<Omit<ICreateCoordinacion, "sedeId">>;
