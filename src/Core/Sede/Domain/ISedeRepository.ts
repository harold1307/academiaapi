import type { ICreateSede } from "./ICreateSede";
import type { ISede } from "./ISede";
import type { IUpdateSede } from "./IUpdateSede";

export type UpdateSedeParams = { id: string; data: IUpdateSede };

export type ISedeRepository = {
	create(data: ICreateSede): Promise<ISede>;
	getAll(): Promise<ISede[]>;
	getById(id: string): Promise<ISede | null>;
	update(params: UpdateSedeParams): Promise<ISede>;
	deleteById(id: string): Promise<ISede>;
};
