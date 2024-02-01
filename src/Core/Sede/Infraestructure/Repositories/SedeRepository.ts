import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateSede } from "../../Domain/ICreateSede";
import type { ISede } from "../../Domain/ISede";
import type {
	ISedeRepository,
	UpdateSedeParams,
} from "../../Domain/ISedeRepository";

@injectable()
export class SedeRepository implements ISedeRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create(data: ICreateSede) {
		const sede = await this._client.sede.create({
			data,
			include: {
				_count: {
					select: {
						lugaresEjecucion: true,
					},
				},
			},
		});

		const { _count, ...rest } = sede;

		return {
			...rest,
			enUso: _count.lugaresEjecucion > 0,
		};
	}
	async getAll(): Promise<ISede[]> {
		const sedes = await this._client.sede.findMany({
			include: {
				_count: {
					select: {
						lugaresEjecucion: true,
					},
				},
			},
		});

		return sedes.map(({ _count, ...i }) => ({
			...i,
			enUso: _count.lugaresEjecucion > 0,
		}));
	}

	async getById(id: string): Promise<ISede | null> {
		const sede = await this._client.sede.findUnique({
			where: { id },
			include: {
				_count: {
					select: {
						lugaresEjecucion: true,
					},
				},
			},
		});

		if (!sede) return null;

		const { _count, ...rest } = sede;

		return {
			...rest,
			enUso: _count.lugaresEjecucion > 0,
		};
	}

	async update({ id, data }: UpdateSedeParams) {
		const sede = await this._client.sede.update({
			where: {
				id,
			},
			data,
			include: {
				_count: {
					select: {
						lugaresEjecucion: true,
					},
				},
			},
		});

		const { _count, ...rest } = sede;

		return {
			...rest,
			enUso: _count.lugaresEjecucion > 0,
		};
	}

	async deleteById(id: string): Promise<ISede> {
		const sede = await this._client.sede.delete({
			where: { id },
			include: {
				_count: {
					select: {
						lugaresEjecucion: true,
					},
				},
			},
		});

		const { _count, ...rest } = sede;

		return {
			...rest,
			enUso: _count.lugaresEjecucion > 0,
		};
	}
}
