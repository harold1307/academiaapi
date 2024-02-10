import type { IUbicacion } from "./IUbicacion";
import type { ICreateUbicacion } from "./ICreateUbicacion";
import type { IUpdateUbicacion } from "./IUpdateUbicacion";

export type UpdateUbicacionParams = {
	id: string;
	data: IUpdateUbicacion;
};

export type IUbicacionRepository = {
	create(data: ICreateUbicacion): Promise<IUbicacion>;
	getAll(): Promise<IUbicacion[]>;
	getById(id: string): Promise<IUbicacion | null>;
	update(params: UpdateUbicacionParams): Promise<IUbicacion>;
	deleteById(id: string): Promise<IUbicacion>;
};
