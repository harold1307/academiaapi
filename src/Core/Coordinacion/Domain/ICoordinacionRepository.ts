import type { ICoordinacion } from "./ICoordinacion";
import type { ICreateCoordinacion } from "./ICreateCoordinacion";
import type { IUpdateCoordinacion } from "./IUpdateCoordinacion";

export type UpdateCoordinacionParams = {
	id: string;
	data: IUpdateCoordinacion;
};

export type ICoordinacionRepository = {
	create(data: ICreateCoordinacion): Promise<ICoordinacion>;
	getAll(): Promise<ICoordinacion[]>;
	getById(id: string): Promise<ICoordinacion | null>;
	update(params: UpdateCoordinacionParams): Promise<ICoordinacion>;
	deleteById(id: string): Promise<ICoordinacion>;
};
