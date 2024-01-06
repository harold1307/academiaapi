import type { IAreaConocimiento } from "./IAreaConocimiento";

export type ICreateAreaConocimiento = Omit<IAreaConocimiento, "id" | "enUso">;
