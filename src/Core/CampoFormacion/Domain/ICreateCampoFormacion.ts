import type { ICampoFormacion } from "./ICampoFormacion";

export type ICreateCampoFormacion = Omit<ICampoFormacion, "id" | "enUso">;
