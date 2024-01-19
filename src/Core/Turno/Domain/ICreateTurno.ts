import type { ITurno } from "./ITurno";

export type ICreateTurno = Omit<ITurno, "id" | "estado" | "enUso">;
