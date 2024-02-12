import type { IUbicacion } from "./IUbicacion";
import type { ICreateUbicacion } from "./ICreateUbicacion";
import type { UpdateUbicacionParams } from "./IUbicacionRepository";

export type IUbicacionService = {
	createUbicacion(data: ICreateUbicacion): Promise<IUbicacion>;
	getAllUbicaciones(filters?: Record<string, string>): Promise<IUbicacion[]>;
	getUbicacionById(id: string): Promise<IUbicacion | null>;
	updateUbicacionById(params: UpdateUbicacionParams): Promise<IUbicacion>;
	deleteUbicacionById(id: string): Promise<IUbicacion>;
};
