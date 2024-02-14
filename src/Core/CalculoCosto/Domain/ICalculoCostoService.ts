import type { ICalculoCosto } from "./ICalculoCosto";
// import type { ICreateCalculoCosto } from "./ICreateCalculoCosto"
import type { UpdateCalculoCostoParams } from "./ICalculoCostoRepository";

export type ICalculoCostoService = {
	// createCalculoCosto(data: ICreateCalculoCosto): Promise<ICalculoCosto>;
	// getAllCalculoCostos(): Promise<ICalculoCosto[]>;
	getCalculoCostoById(id: string): Promise<ICalculoCosto | null>;
	updateCalculoCostoById(
		params: UpdateCalculoCostoParams,
	): Promise<ICalculoCosto>;
	// deleteCalculoCostoById(id: string): Promise<ICalculoCosto>;
};
