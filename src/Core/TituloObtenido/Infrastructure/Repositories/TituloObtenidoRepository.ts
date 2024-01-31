import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateTituloObtenido } from "../../Domain/ICreateTituloObtenido";
import type { ITituloObtenido } from "../../Domain/ITituloObtenido";
import type {
	ITituloObtenidoRepository,
	UpdateTituloObtenidoParams,
} from "../../Domain/ITituloObtenidoRepository";

@injectable()
export class TituloObtenidoRepository implements ITituloObtenidoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ITituloObtenido[]> {
		const titulos = await this._client.tituloObtenido.findMany();

		return titulos.map(rest => ({ ...rest, enUso: false }));
	}
	async getById(id: string): Promise<ITituloObtenido | null> {
		const titulo = await this._client.tituloObtenido.findUnique({
			where: { id },
		});

		if (!titulo) return null;

		const { ...rest } = titulo;

		return { ...rest, enUso: false };
	}
	async deleteById(id: string): Promise<ITituloObtenido> {
		const titulo = await this._client.tituloObtenido.delete({
			where: { id },
		});

		return { ...titulo, enUso: false };
	}

	async create({
		programaId,
		...data
	}: ICreateTituloObtenido): Promise<ITituloObtenido> {
		const titulo = await this._client.tituloObtenido.create({
			data: {
				...data,
				programa: {
					connect: {
						id: programaId,
					},
				},
			},
		});

		return { ...titulo, enUso: false };
	}
	async update({
		id,
		data,
	}: UpdateTituloObtenidoParams): Promise<ITituloObtenido> {
		const titulo = await this._client.tituloObtenido.update({
			where: { id },
			data,
		});

		return { ...titulo, enUso: false };
	}
}
