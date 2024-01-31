import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreatePerfilPractica } from "../../Domain/ICreatePerfilPractica";
import type { IPerfilPractica } from "../../Domain/IPerfilPractica";
import type {
	IPerfilPracticaRepository,
	UpdatePerfilPracticaParams,
} from "../../Domain/IPerfilPracticaRepository";

@injectable()
export class PerfilPracticaRepository implements IPerfilPracticaRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IPerfilPractica[]> {
		const perfiles = await this._client.perfilPractica.findMany({
			include: {
				perfilesPracticaProgramas: { take: 1 },
			},
		});

		return perfiles.map(({ perfilesPracticaProgramas, ...rest }) => ({
			...rest,
			enUso: perfilesPracticaProgramas.length > 0,
		}));
	}
	async getById(id: string): Promise<IPerfilPractica | null> {
		const perfil = await this._client.perfilPractica.findUnique({
			where: { id },
			include: { perfilesPracticaProgramas: { take: 1 } },
		});

		if (!perfil) return null;

		const { perfilesPracticaProgramas, ...rest } = perfil;

		return {
			...rest,
			enUso: perfilesPracticaProgramas.length > 0,
		};
	}
	async deleteById(id: string): Promise<IPerfilPractica> {
		const perfil = await this._client.perfilPractica.delete({
			where: { id },
		});

		return {
			...perfil,
			enUso: false,
		};
	}

	async create(data: ICreatePerfilPractica): Promise<IPerfilPractica> {
		const perfil = await this._client.perfilPractica.create({
			data,
		});

		return {
			...perfil,
			enUso: false,
		};
	}
	async update({
		id,
		data,
	}: UpdatePerfilPracticaParams): Promise<IPerfilPractica> {
		const perfil = await this._client.perfilPractica.update({
			where: { id },
			data,
			include: {
				perfilesPracticaProgramas: { take: 1 },
			},
		});

		const { perfilesPracticaProgramas, ...rest } = perfil;

		return {
			...rest,
			enUso: perfilesPracticaProgramas.length > 0,
		};
	}
}
