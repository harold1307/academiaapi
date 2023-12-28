import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICompetencia } from "../../Domain/ICompetencia";
import type { ICompetenciaRepository } from "../../Domain/ICompetenciaRepository";
import type { ICreateCompetencia } from "../../Domain/ICreateCompetencia";

@injectable()
export class CompetenciaRepository implements ICompetenciaRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ICompetencia[]> {
		return this._client.competencia.findMany();
	}

	async getById(id: string): Promise<ICompetencia | null> {
		return this._client.competencia.findUnique({ where: { id } });
	}

	async deleteById(id: string): Promise<ICompetencia> {
		return this._client.competencia.delete({ where: { id } });
	}

	create(data: ICreateCompetencia): Promise<ICompetencia> {
		return this._client.competencia.create({
			data,
		});
	}
}
