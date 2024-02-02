import type { ICreateEjeFormativo } from "./ICreateEjeFormativo";
import type { IEjeFormativo } from "./IEjeFormativo";
import type { IUpdateEjeFormativo } from "./IUpdateEjeFormativo";

export type UpdateEjeFormativoParams = {
	id: string;
	data: IUpdateEjeFormativo;
};

export type IEjeFormativoRepository = {
	create(data: ICreateEjeFormativo): Promise<IEjeFormativo>;
	getAll(): Promise<IEjeFormativo[]>;
	getById(id: string): Promise<IEjeFormativo | null>;
	update(params: UpdateEjeFormativoParams): Promise<IEjeFormativo>;
	deleteById(id: string): Promise<IEjeFormativo>;
};
