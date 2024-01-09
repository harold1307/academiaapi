import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IInstitucionRepository } from "../../Domain/IInstitucionRepository";
import type { ICreateInstitucion } from "../DTOs/CreateInstitucionDTO";
import type { IUpdateInstitucion } from "../DTOs/UpdateInstitucionDTO";
import type { IInstitucion } from "../../Domain/IInstitucion";

@injectable()
export class InstitucionRepository implements IInstitucionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create(data: ICreateInstitucion) {
		const institucion = await this._client.institucion.create({
			data,
			include: {
				_count: {
					select: {
						lugaresEjecucion: true,
					},
				},
			},
		});

		const { _count, ...rest } = institucion;

		return {
			...rest,
			enUso: _count.lugaresEjecucion > 0,
		};
	}
	async getAll(): Promise<IInstitucion[]> {
		const instituciones = await this._client.institucion.findMany({
			include: {
				_count: {
					select: {
						lugaresEjecucion: true,
					},
				},
			},
		});

		return instituciones.map(({ _count, ...i }) => ({
			...i,
			enUso: _count.lugaresEjecucion > 0,
		}));
	}

	async getById(id: string): Promise<IInstitucion | null> {
		const institucion = await this._client.institucion.findUnique({
			where: { id },
			include: {
				_count: {
					select: {
						lugaresEjecucion: true,
					},
				},
			},
		});

		if (!institucion) return null;

		const { _count, ...rest } = institucion;

		return {
			...rest,
			enUso: _count.lugaresEjecucion > 0,
		};
	}

	async update({ id, data }: { id: string; data: IUpdateInstitucion }) {
		const institucion = await this._client.institucion.update({
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

		const { _count, ...rest } = institucion;

		return {
			...rest,
			enUso: _count.lugaresEjecucion > 0,
		};
	}

	async deleteById(id: string): Promise<IInstitucion> {
		const institucion = await this._client.institucion.delete({
			where: { id },
			include: {
				_count: {
					select: {
						lugaresEjecucion: true,
					},
				},
			},
		});

		const { _count, ...rest } = institucion;

		return {
			...rest,
			enUso: _count.lugaresEjecucion > 0,
		};
	}
}
