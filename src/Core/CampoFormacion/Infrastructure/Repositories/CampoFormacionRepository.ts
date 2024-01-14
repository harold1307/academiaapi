import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICampoFormacion } from "../../Domain/ICampoFormacion";
import type { ICampoFormacionRepository } from "../../Domain/ICampoFormacionRepository";
import type { ICreateCampoFormacion } from "../../Domain/ICreateCampoFormacion";

@injectable()
export class CampoFormacionRepository implements ICampoFormacionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ICampoFormacion[]> {
		const campos = await this._client.campoFormacion.findMany({
			include: {
				_count: {
					select: {
						asignaturasEnMalla: true,
					},
				},
			},
		});

		return campos.map(({ _count, ...c }) => ({
			...c,
			enUso: _count.asignaturasEnMalla > 0,
		}));
	}

	async getById(id: string): Promise<ICampoFormacion | null> {
		const campo = await this._client.campoFormacion.findUnique({
			where: { id },
			include: {
				_count: {
					select: { asignaturasEnMalla: true },
				},
			},
		});

		if (!campo) return null;

		const { _count, ...c } = campo;

		return {
			...c,
			enUso: _count.asignaturasEnMalla > 0,
		};
	}

	async deleteById(id: string): Promise<ICampoFormacion> {
		const campo = await this._client.campoFormacion.delete({
			where: { id },
			include: {
				_count: {
					select: {
						asignaturasEnMalla: true,
					},
				},
			},
		});

		const { _count, ...rest } = campo;
		return {
			...rest,
			enUso: _count.asignaturasEnMalla > 0,
		};
	}

	async create(data: ICreateCampoFormacion): Promise<ICampoFormacion> {
		const campo = await this._client.campoFormacion.create({ data });

		return {
			...campo,
			enUso: false,
		};
	}

	async update(params: {
		id: string;
		campoFormacion: Partial<ICreateCampoFormacion>;
	}): Promise<ICampoFormacion> {
		const campo = await this._client.campoFormacion.update({
			where: { id: params.id },
			data: params.campoFormacion,
			include: {
				_count: {
					select: {
						asignaturasEnMalla: true,
					},
				},
			},
		});

		const { _count, ...rest } = campo;

		return {
			...rest,
			enUso: _count.asignaturasEnMalla > 0,
		};
	}
}
