import type { ICreateUbicacion } from "./ICreateUbicacion";

export type IUpdateUbicacion = Partial<
	ICreateUbicacion & {
		estado: boolean;
	}
>;
