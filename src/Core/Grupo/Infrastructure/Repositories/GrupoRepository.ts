import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateGrupo } from "../../Domain/ICreateGrupo";
import type { IGrupo } from "../../Domain/IGrupo";
import type {
	IGrupoRepository,
	UpdateGrupoParams,
} from "../../Domain/IGrupoRepository";

@injectable()
export class GrupoRepository implements IGrupoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IGrupo[]> {
		const grupos = await this._client.grupo.findMany({
			include: {
				usuarios: {
					select: {
						usuario: {
							select: {
								estado: true,
							},
						},
					},
				},
			},
		});

		return grupos.map(({ usuarios, ...g }) => ({
			...g,
			enUso: usuarios.length > 0,
			usuarios: usuarios.length,
			activos: usuarios.filter(({ usuario }) => usuario.estado).length,
			inactivos: usuarios.filter(({ usuario }) => !usuario.estado).length,
		}));
	}
	async getById(id: string): Promise<IGrupo | null> {
		const grupo = await this._client.grupo.findUnique({
			where: { id },
			include: {
				usuarios: {
					select: {
						usuario: {
							select: {
								estado: true,
							},
						},
					},
				},
			},
		});

		if (!grupo) return null;

		const { usuarios, ...g } = grupo;

		return {
			...g,
			enUso: usuarios.length > 0,
			usuarios: usuarios.length,
			activos: usuarios.filter(({ usuario }) => usuario.estado).length,
			inactivos: usuarios.filter(({ usuario }) => !usuario.estado).length,
		};
	}
	async deleteById(id: string): Promise<IGrupo> {
		const grupo = await this._client.grupo.delete({ where: { id } });

		return {
			...grupo,
			enUso: false,
			activos: 0,
			inactivos: 0,
			usuarios: 0,
		};
	}

	async create(data: ICreateGrupo): Promise<IGrupo> {
		const grupo = await this._client.grupo.create({
			data,
		});

		return {
			...grupo,
			enUso: false,
			activos: 0,
			inactivos: 0,
			usuarios: 0,
		};
	}
	async update({ id, data }: UpdateGrupoParams): Promise<IGrupo> {
		const grupo = await this._client.grupo.update({
			where: { id },
			data,
			include: {
				usuarios: {
					select: {
						usuario: {
							select: {
								estado: true,
							},
						},
					},
				},
			},
		});

		const { usuarios, ...g } = grupo;

		return {
			...g,
			enUso: usuarios.length > 0,
			usuarios: usuarios.length,
			activos: usuarios.filter(({ usuario }) => usuario.estado).length,
			inactivos: usuarios.filter(({ usuario }) => !usuario.estado).length,
		};
	}
}
