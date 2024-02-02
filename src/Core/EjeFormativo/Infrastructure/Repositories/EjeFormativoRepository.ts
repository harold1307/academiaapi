import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateEjeFormativo } from "../../Domain/ICreateEjeFormativo";
import type { IEjeFormativo } from "../../Domain/IEjeFormativo";
import type {
	IEjeFormativoRepository,
	UpdateEjeFormativoParams,
} from "../../Domain/IEjeFormativoRepository";

@injectable()
export class EjeFormativoRepository implements IEjeFormativoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IEjeFormativo[]> {
		const ejes = await this._client.ejeFormativo.findMany({
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
			},
		});

		return ejes.map(({ asignaturasEnNivelMalla, ...rest }) => ({
			...rest,
			enUso: asignaturasEnNivelMalla.length > 0,
		}));
	}

	async getById(id: string): Promise<IEjeFormativo | null> {
		const eje = await this._client.ejeFormativo.findUnique({
			where: { id },
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
			},
		});

		if (!eje) return eje;

		const { asignaturasEnNivelMalla, ...rest } = eje;
		return {
			...rest,
			enUso: asignaturasEnNivelMalla.length > 0,
		};
	}

	async deleteById(id: string): Promise<IEjeFormativo> {
		const eje = await this._client.ejeFormativo.delete({
			where: { id },
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
			},
		});

		const { asignaturasEnNivelMalla, ...rest } = eje;
		return {
			...rest,
			enUso: asignaturasEnNivelMalla.length > 0,
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

	async update({ id, data }: UpdateEjeFormativoParams): Promise<IEjeFormativo> {
		const eje = await this._client.ejeFormativo.update({
			where: { id: id },
			data,
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
			},
		});

		const { asignaturasEnNivelMalla, ...rest } = eje;

		return {
			...rest,
			enUso: asignaturasEnNivelMalla.length > 0,
		};
	}
}
