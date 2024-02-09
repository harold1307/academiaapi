import type { ICreateUbicacion } from "./ICreateUbicacion";

export type IUpdateUbicacion = Partial<
	Omit<ICreateUbicacion, "sedeId"> & {
		estado: boolean;
	}
>;
