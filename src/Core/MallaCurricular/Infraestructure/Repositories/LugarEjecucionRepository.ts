import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateLugarEjecucion } from "../../Domain/ICreateLugarEjecucion";
import type { ILugarEjecucion } from "../../Domain/ILugarEjecucion";
import type { ILugarEjecucionRepository } from "../../Domain/ILugarEjecucionRepository";

@injectable()
export class LugarEjecucionRepository implements ILugarEjecucionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ILugarEjecucion[]> {
		const lugares = await this._client.lugarEjecucion.findMany({
			include: {
				sede: true,
			},
		});

		return lugares.map(l => ({
			...l,
			sede: {
				...l.sede,
				enUso: true,
			},
		}));
	}

	async create({
		mallaId,
		sedeId,
		...data
	}: ICreateLugarEjecucion): Promise<ILugarEjecucion> {
		const lugar = await this._client.lugarEjecucion.create({
			data: {
				...data,
				malla: { connect: { id: mallaId } },
				sede: { connect: { id: sedeId } },
			},
			include: {
				sede: true,
			},
		});

		return {
			...lugar,
			sede: {
				...lugar.sede,
				enUso: true,
			},
		};
	}
}
