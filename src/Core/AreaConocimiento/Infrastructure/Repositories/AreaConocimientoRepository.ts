import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAreaConocimiento } from "../../Domain/IAreaConocimiento";
import type { IAreaConocimientoRepository } from "../../Domain/IAreaConocimientoRepository";
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
				_count: {
					select: {
						asignaturasEnMalla: true,
					},
				},
			},
		});

		return areas.map(({ _count, ...a }) => ({
			...a,
			enUso: _count.asignaturasEnMalla > 0,
		}));
	}

	async getById(id: string): Promise<IAreaConocimiento | null> {
		const area = await this._client.areaConocimiento.findUnique({
			where: { id },
			include: { _count: { select: { asignaturasEnMalla: true } } },
		});

		if (!area) return null;

		const { _count, ...rest } = area;

		return {
			...rest,
			enUso: _count.asignaturasEnMalla > 0,
		};
	}

	async deleteById(id: string): Promise<IAreaConocimiento> {
		const area = await this._client.areaConocimiento.delete({
			where: { id },
			include: {
				_count: {
					select: {
						asignaturasEnMalla: true,
					},
				},
			},
		});

		const { _count, ...rest } = area;
		return {
			...rest,
			enUso: _count.asignaturasEnMalla > 0,
		};
	}

	async update(params: {
		id: string;
		areaConocimiento: Partial<ICreateAreaConocimiento>;
	}): Promise<IAreaConocimiento> {
		const eje = await this._client.areaConocimiento.update({
			where: { id: params.id },
			data: params.areaConocimiento,
			include: {
				_count: {
					select: {
						asignaturasEnMalla: true,
					},
				},
			},
		});

		const { _count, ...rest } = eje;

		return {
			...rest,
			enUso: _count.asignaturasEnMalla > 0,
		};
	}
}
