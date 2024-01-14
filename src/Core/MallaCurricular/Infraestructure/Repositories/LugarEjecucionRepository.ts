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
				institucion: true,
			},
		});

		return lugares.map(l => ({
			...l,
			institucion: {
				...l.institucion,
				enUso: true,
			},
		}));
	}

	async create(data: ICreateLugarEjecucion): Promise<ILugarEjecucion> {
		const lugar = await this._client.lugarEjecucion.create({
			data,
			include: {
				institucion: true,
			},
		});

		return {
			...lugar,
			institucion: {
				...lugar.institucion,
				enUso: true,
			},
		};
	}
}
