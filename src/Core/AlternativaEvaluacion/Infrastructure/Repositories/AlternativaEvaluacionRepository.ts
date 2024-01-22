import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAlternativaEvaluacion } from "../../Domain/IAlternativaEvaluacion";
import type {
	IAlternativaEvaluacionRepository,
	IUpdateAlternativaEvaluacionParams,
} from "../../Domain/IAlternativaEvaluacionRepository";
import type { ICreateAlternativaEvaluacion } from "../../Domain/ICreateAlternativaEvaluacion";

@injectable()
export class AlternativaEvaluacionRepository
	implements IAlternativaEvaluacionRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IAlternativaEvaluacion[]> {
		const alternativas = await this._client.alternativaEvaluacion.findMany({
			include: {
				camposModeloEvaluativo: {
					take: 1,
				},
			},
		});

		return alternativas.map(({ camposModeloEvaluativo, ...rest }) => ({
			...rest,
			enUso: camposModeloEvaluativo.length > 0,
		}));
	}
	async getById(id: string): Promise<IAlternativaEvaluacion | null> {
		const alternativa = await this._client.alternativaEvaluacion.findUnique({
			where: { id },
			include: {
				camposModeloEvaluativo: {
					take: 1,
				},
			},
		});

		if (!alternativa) return null;

		const { camposModeloEvaluativo, ...rest } = alternativa;

		return {
			...rest,
			enUso: camposModeloEvaluativo.length > 0,
		};
	}
	async deleteById(id: string): Promise<IAlternativaEvaluacion> {
		const alternativa = await this._client.alternativaEvaluacion.delete({
			where: { id },
		});

		return {
			...alternativa,
			enUso: false,
		};
	}

	async create(
		data: ICreateAlternativaEvaluacion,
	): Promise<IAlternativaEvaluacion> {
		const alternativa = await this._client.alternativaEvaluacion.create({
			data,
		});

		return {
			...alternativa,
			enUso: false,
		};
	}
	async update({
		id,
		data,
	}: IUpdateAlternativaEvaluacionParams): Promise<IAlternativaEvaluacion> {
		const alternativa = await this._client.alternativaEvaluacion.update({
			where: { id: id },
			data,
			include: {
				camposModeloEvaluativo: {
					take: 1,
				},
			},
		});

		const { camposModeloEvaluativo, ...rest } = alternativa;

		return {
			...rest,
			enUso: camposModeloEvaluativo.length > 0,
		};
	}
}
