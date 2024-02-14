import type { ICorte } from "./ICorte";
import type { ICreateCorte } from "./ICreateCorte";
import type { IUpdateCorte } from "./IUpdateCorte";

export type UpdateCorteParams = {
	id: string;
	data: IUpdateCorte;
};

export type ICorteRepository = {
	create(data: ICreateCorte): Promise<ICorte>;
	getAll(): Promise<ICorte[]>;
	getById(id: string): Promise<ICorte | null>;
	update(params: UpdateCorteParams): Promise<ICorte>;
	deleteById(id: string): Promise<ICorte>;
};
