import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICalculoCosto } from "../../Domain/ICalculoCosto";
import type {
	ICalculoCostoRepository,
	UpdateCalculoCostoParams,
} from "../../Domain/ICalculoCostoRepository";
// import type { ICreateCalculoCosto } from "../../Domain/ICreateCalculoCosto";

@injectable()
export class CalculoCostoRepository implements ICalculoCostoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	// getAll(): Promise<ICalculoCosto[]> {}
	getById(id: string): Promise<ICalculoCosto | null> {
		return this._client.calculoCosto.findUnique({ where: { id } });
	}
	// deleteById(id: string): Promise<ICalculoCosto> {}

	// create(data: ICreateCalculoCosto): Promise<ICalculoCosto> {}
	update({ id, data }: UpdateCalculoCostoParams): Promise<ICalculoCosto> {
		return this._client.calculoCosto.update({
			where: { id },
			data,
		});
	}
}
