import type { IAreaConocimiento } from "./IAreaConocimiento";
import type { ICreateAreaConocimiento } from "./ICreateAreaConocimiento";
import type { IUpdateAreaConocimiento } from "./IUpdateAreaConocimiento";

export type IUpdateAreaConocimientoParams = {
	id: string;
	data: IUpdateAreaConocimiento;
};

export type IAreaConocimientoRepository = {
	create(data: ICreateAreaConocimiento): Promise<IAreaConocimiento>;
	getAll(): Promise<IAreaConocimiento[]>;
	getById(id: string): Promise<IAreaConocimiento | null>;
	update(params: IUpdateAreaConocimientoParams): Promise<IAreaConocimiento>;
	deleteById(id: string): Promise<IAreaConocimiento>;
};
