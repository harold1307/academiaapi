import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateParalelo } from "../../Domain/ICreateParalelo";
import type { IParalelo } from "../../Domain/IParalelo";
import type { IParaleloRepository } from "../../Domain/IParaleloRepository";

@injectable()
export class ParaleloRepository implements IParaleloRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IParalelo[]> {
		const paralelos = await this._client.paralelo.findMany({
			include: {
				cursoEscuelas: {
					take: 1,
				},
			},
		});

		return paralelos.map(({ cursoEscuelas, ...rest }) => ({
			...rest,
			enUso: cursoEscuelas.length > 0,
		}));
	}

	async getById(id: string): Promise<IParalelo | null> {
		const paralelo = await this._client.paralelo.findUnique({
			where: { nombre: id },
			include: {
				cursoEscuelas: {
					take: 1,
				},
			},
		});

		if (!paralelo) return null;

		const { cursoEscuelas, ...rest } = paralelo;

		return {
			...rest,
			enUso: cursoEscuelas.length > 0,
		};
	}

	async create(data: ICreateParalelo): Promise<IParalelo> {
		const newParalelo = await this._client.paralelo.create({ data });

		return {
			...newParalelo,
			enUso: false,
		};
	}

	async deleteById(id: string): Promise<IParalelo> {
		const paralelo = await this._client.paralelo.delete({
			where: { nombre: id },
		});

		return {
			...paralelo,
			enUso: false,
		};
	}
}
