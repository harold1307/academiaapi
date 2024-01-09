import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateEjeFormativo } from "../../Domain/ICreateEjeFormativo";
import type { IEjeFormativo } from "../../Domain/IEjeFormativo";
import type { IEjeFormativoRepository } from "../../Domain/IEjeFormativoRepository";

@injectable()
export class EjeFormativoRepository implements IEjeFormativoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IEjeFormativo[]> {
		const ejes = await this._client.ejeFormativo.findMany({
			include: {
				_count: {
					select: {
						asignaturasEnMalla: true,
					},
				},
			},
		});

		return ejes.map(({ _count, ...e }) => ({
			...e,
			enUso: _count.asignaturasEnMalla > 0,
		}));
	}

	async getById(id: string): Promise<IEjeFormativo | null> {
		const eje = await this._client.ejeFormativo.findUnique({
			where: { id },
			include: {
				_count: {
					select: {
						asignaturasEnMalla: true,
					},
				},
			},
		});

		if (!eje) return eje;

		const { _count, ...rest } = eje;
		return {
			...rest,
			enUso: _count.asignaturasEnMalla > 0,
		};
	}

	async deleteById(id: string): Promise<IEjeFormativo> {
		const eje = await this._client.ejeFormativo.delete({
			where: { id },
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

	async create(data: ICreateEjeFormativo): Promise<IEjeFormativo> {
		const eje = await this._client.ejeFormativo.create({
			data,
		});

		return {
			...eje,
			enUso: false,
		};
	}

	async update(params: {
		id: string;
		ejeFormativo: Partial<ICreateEjeFormativo>;
	}): Promise<IEjeFormativo> {
		const eje = await this._client.ejeFormativo.update({
			where: { id: params.id },
			data: params.ejeFormativo,
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
