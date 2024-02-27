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
	async getById(id: string): Promise<ICalculoCosto | null> {
		const calculo = await this._client.calculoCosto.findUnique({
			where: { id },
		});

		if (!calculo) return null;

		return {
			...calculo,
			planCostos:
				calculo.cronogramaFechasOpcionPago !== null &&
				calculo.estudiantesEligenOpcionPago !== null,
		};
	}
	// deleteById(id: string): Promise<ICalculoCosto> {}

	// create(data: ICreateCalculoCosto): Promise<ICalculoCosto> {}
	async update({ id, data }: UpdateCalculoCostoParams): Promise<ICalculoCosto> {
		const calculo = await this._client.calculoCosto.update({
			where: { id },
			data,
		});

		return {
			...calculo,
			planCostos:
				calculo.cronogramaFechasOpcionPago !== null &&
				calculo.estudiantesEligenOpcionPago !== null,
		};
	}
}
