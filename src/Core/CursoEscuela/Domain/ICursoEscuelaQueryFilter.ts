import type { NonNullableObject } from "../../../types";
import type { ICursoEscuela } from "./ICursoEscuela";

export type ICursoEscuelaQueryFilter = Partial<
	NonNullableObject<Omit<ICursoEscuela, "enUso">>
>;
