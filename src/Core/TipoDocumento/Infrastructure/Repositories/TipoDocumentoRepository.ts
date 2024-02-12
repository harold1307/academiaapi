import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ITipoDocumento } from "../../Domain/ITipoDocumento";
import type {
	ITipoDocumentoRepository,
	UpdateTipoDocumentoParams,
} from "../../Domain/ITipoDocumentoRepository";
import type { ICreateTipoDocumento } from "../../Domain/ICreateTipoDocumento";

@injectable()
export class TipoDocumentoRepository implements ITipoDocumentoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ITipoDocumento[]> {
		const tipos = await this._client.tipoDocumento.findMany({
			include: {
				programas: {
					take: 1,
				},
			},
		});

		return tipos.map(({ programas, ...rest }) => ({
			...rest,
			enUso: programas.length > 0,
		}));
	}
	async getById(id: string): Promise<ITipoDocumento | null> {
		const tipo = await this._client.tipoDocumento.findUnique({
			where: { id },
			include: {
				programas: {
					take: 1,
				},
			},
		});

		if (!tipo) return null;

		const { programas, ...rest } = tipo;

		return {
			...rest,
			enUso: programas.length > 0,
		};
	}
	async deleteById(id: string): Promise<ITipoDocumento> {
		const tipo = await this._client.tipoDocumento.delete({
			where: { id },
		});

		return { ...tipo, enUso: false };
	}

	async create(data: ICreateTipoDocumento): Promise<ITipoDocumento> {
		const tipo = await this._client.tipoDocumento.create({ data });

		return { ...tipo, enUso: false };
	}
	async update({
		id,
		data,
	}: UpdateTipoDocumentoParams): Promise<ITipoDocumento> {
		const tipo = await this._client.tipoDocumento.update({
			where: { id },
			data,
			include: {
				programas: {
					take: 1,
				},
			},
		});

		const { programas, ...rest } = tipo;

		return {
			...rest,
			enUso: programas.length > 0,
		};
	}
}
