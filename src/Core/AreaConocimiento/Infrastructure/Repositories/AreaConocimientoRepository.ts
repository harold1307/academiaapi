import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAreaConocimiento } from "../../Domain/IAreaConocimiento";
import type {
	IAreaConocimientoRepository,
	IUpdateAreaConocimientoParams,
} from "../../Domain/IAreaConocimientoRepository";
import type { ICreateAreaConocimiento } from "../../Domain/ICreateAreaConocimiento";

@injectable()
export class AreaConocimientoRepository implements IAreaConocimientoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create(data: ICreateAreaConocimiento): Promise<IAreaConocimiento> {
		const area = await this._client.areaConocimiento.create({ data });

		return {
			...area,
			enUso: false,
		};
	}

	async getAll(): Promise<IAreaConocimiento[]> {
		const areas = await this._client.areaConocimiento.findMany({
			include: {
				asignaturasEnMalla: {
					take: 1,
				},
			},
		});

		return areas.map(({ asignaturasEnMalla, ...a }) => ({
			...a,
			enUso: asignaturasEnMalla.length > 0,
		}));
	}

	async getById(id: string): Promise<IAreaConocimiento | null> {
		const area = await this._client.areaConocimiento.findUnique({
			where: { id },
			include: {
				asignaturasEnMalla: {
					take: 1,
				},
			},
		});

		if (!area) return null;

		const { asignaturasEnMalla, ...rest } = area;

		return {
			...rest,
			enUso: asignaturasEnMalla.length > 0,
		};
	}

	async deleteById(id: string): Promise<IAreaConocimiento> {
		const area = await this._client.areaConocimiento.delete({
			where: { id },
			include: {
				asignaturasEnMalla: {
					take: 1,
				},
			},
		});

		const { asignaturasEnMalla, ...rest } = area;
		return {
			...rest,
			enUso: asignaturasEnMalla.length > 0,
		};
	}

	async update({
		id,
		data,
	}: IUpdateAreaConocimientoParams): Promise<IAreaConocimiento> {
		const eje = await this._client.areaConocimiento.update({
			where: { id: id },
			data,
			include: {
				asignaturasEnMalla: {
					take: 1,
				},
			},
		});

		const { asignaturasEnMalla, ...rest } = eje;

		return {
			...rest,
			enUso: asignaturasEnMalla.length > 0,
		};
	}
}
