import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateTipoDocumentoEnPrograma } from "../../Domain/ICreateTipoDocumentoEnPrograma";
import type { ITipoDocumentoEnPrograma } from "../../Domain/ITipoDocumentoEnPrograma";
import type {
	ITipoDocumentoEnProgramaRepository,
	UpdateTipoDocumentoEnProgramaParams,
} from "../../Domain/ITipoDocumentoEnProgramaRepository";

@injectable()
export class TipoDocumentoEnProgramaRepository
	implements ITipoDocumentoEnProgramaRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ITipoDocumentoEnPrograma[]> {
		const tipos = await this._client.tipoDocumentoEnPrograma.findMany({
			include: {
				tipoDocumento: true,
			},
		});

		return tipos.map(({ tipoDocumento, ...rest }) => ({
			...rest,
			enUso: false,
			tipoDocumento: {
				...tipoDocumento,
				enUso: true,
			},
		}));
	}
	async getById(id: string): Promise<ITipoDocumentoEnPrograma | null> {
		const tipo = await this._client.tipoDocumentoEnPrograma.findUnique({
			where: { id },
			include: {
				tipoDocumento: true,
			},
		});

		if (!tipo) return null;

		const { tipoDocumento, ...rest } = tipo;

		return {
			...rest,
			enUso: false,
			tipoDocumento: {
				...tipoDocumento,
				enUso: true,
			},
		};
	}
	async deleteById(id: string): Promise<ITipoDocumentoEnPrograma> {
		const tipo = await this._client.tipoDocumentoEnPrograma.delete({
			where: { id },
			include: {
				tipoDocumento: {
					include: {
						programas: {
							take: 2,
						},
					},
				},
			},
		});

		const {
			tipoDocumento: { programas, ...tipoDocumento },
			...rest
		} = tipo;

		return {
			...rest,
			enUso: false,
			tipoDocumento: {
				...tipoDocumento,
				enUso: programas.length > 0,
			},
		};
	}

	async create({
		programaId,
		tipoDocumentoId,
		...data
	}: ICreateTipoDocumentoEnPrograma): Promise<ITipoDocumentoEnPrograma> {
		const tipo = await this._client.tipoDocumentoEnPrograma.create({
			data: {
				...data,
				programa: { connect: { id: programaId } },
				tipoDocumento: { connect: { id: tipoDocumentoId } },
			},
			include: {
				tipoDocumento: true,
			},
		});

		const { tipoDocumento, ...rest } = tipo;

		return {
			...rest,
			enUso: false,
			tipoDocumento: {
				...tipoDocumento,
				enUso: true,
			},
		};
	}
	async update({
		id,
		data: { tipoDocumentoId, ...data },
	}: UpdateTipoDocumentoEnProgramaParams): Promise<ITipoDocumentoEnPrograma> {
		const tipo = await this._client.tipoDocumentoEnPrograma.update({
			where: { id },
			data: {
				...data,
				...(tipoDocumentoId
					? { tipoDocumento: { connect: { id: tipoDocumentoId } } }
					: {}),
			},
			include: {
				tipoDocumento: true,
			},
		});

		const { tipoDocumento, ...rest } = tipo;

		return {
			...rest,
			enUso: false,
			tipoDocumento: {
				...tipoDocumento,
				enUso: true,
			},
		};
	}
}
