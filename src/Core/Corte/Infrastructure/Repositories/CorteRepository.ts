import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICorte } from "../../Domain/ICorte";
import type {
	ICorteRepository,
	UpdateCorteParams,
} from "../../Domain/ICorteRepository";
import type { ICreateCorte } from "../../Domain/ICreateCorte";

@injectable()
export class CorteRepository implements ICorteRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ICorte[]> {
		const cortes = await this._client.corte.findMany({
			include: {
				periodos: {
					take: 1,
				},
			},
		});

		return cortes.map(({ periodos, ...c }) => ({
			...c,
			enUso: periodos.length > 0,
		}));
	}
	async getById(id: string): Promise<ICorte | null> {
		const corte = await this._client.corte.findUnique({
			where: { id },
			include: {
				periodos: {
					take: 1,
				},
			},
		});

		if (!corte) return null;

		const { periodos, ...c } = corte;

		return {
			...c,
			enUso: periodos.length > 0,
		};
	}
	async deleteById(id: string): Promise<ICorte> {
		const corte = await this._client.corte.delete({ where: { id } });

		return {
			...corte,
			enUso: false,
		};
	}

	async create(data: ICreateCorte): Promise<ICorte> {
		const corte = await this._client.corte.create({
			data,
		});

		return {
			...corte,
			enUso: false,
		};
	}
	async update({ id, data }: UpdateCorteParams): Promise<ICorte> {
		const corte = await this._client.corte.update({
			where: { id },
			data,
			include: {
				periodos: {
					take: 1,
				},
			},
		});

		const { periodos, ...c } = corte;

		return {
			...c,
			enUso: periodos.length > 0,
		};
	}
}
