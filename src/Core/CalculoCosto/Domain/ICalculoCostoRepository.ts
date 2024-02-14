import type { ICalculoCosto } from "./ICalculoCosto";
// import type { ICreateCalculoCosto } from "./ICreateCalculoCosto"
import type { IUpdateCalculoCosto } from "./IUpdateCalculoCosto";

export type UpdateCalculoCostoParams = {
	id: string;
	data: IUpdateCalculoCosto;
};

export type ICalculoCostoRepository = {
	// create(data: ICreateCalculoCosto): Promise<ICalculoCosto>;
	// getAll(): Promise<ICalculoCosto[]>;
	getById(id: string): Promise<ICalculoCosto | null>;
	update(params: UpdateCalculoCostoParams): Promise<ICalculoCosto>;
	// deleteById(id: string): Promise<ICalculoCosto>;
};
