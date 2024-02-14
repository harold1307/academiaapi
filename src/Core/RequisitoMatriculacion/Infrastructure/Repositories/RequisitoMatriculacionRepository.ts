import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateRequisitoMatriculacion } from "../../Domain/ICreateRequisitoMatriculacion";
import type { IRequisitoMatriculacion } from "../../Domain/IRequisitoMatriculacion";
import type {
	IRequisitoMatriculacionRepository,
	UpdateRequisitoMatriculacionParams,
} from "../../Domain/IRequisitoMatriculacionRepository";

@injectable()
export class RequisitoMatriculacionRepository
	implements IRequisitoMatriculacionRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IRequisitoMatriculacion[]> {
		return this._client.requisitoMatriculacion.findMany();
	}
	async getById(id: string): Promise<IRequisitoMatriculacion | null> {
		return this._client.requisitoMatriculacion.findUnique({ where: { id } });
	}
	async deleteById(id: string): Promise<IRequisitoMatriculacion> {
		return this._client.requisitoMatriculacion.delete({ where: { id } });
	}

	async create({
		nivelId,
		periodoId,
		tipoDocumentoId,
		...data
	}: ICreateRequisitoMatriculacion): Promise<IRequisitoMatriculacion> {
		return this._client.requisitoMatriculacion.create({
			data: {
				...data,
				nivel: { connect: { id: nivelId } },
				periodo: { connect: { id: periodoId } },
				tipoDocumento: { connect: { id: tipoDocumentoId } },
			},
		});
	}
	async update({
		id,
		data: { nivelId, tipoDocumentoId, ...data },
	}: UpdateRequisitoMatriculacionParams): Promise<IRequisitoMatriculacion> {
		return this._client.requisitoMatriculacion.update({
			where: { id },
			data: {
				...data,
				nivel: nivelId ? { connect: { id: nivelId } } : undefined,
				tipoDocumento: tipoDocumentoId
					? { connect: { id: tipoDocumentoId } }
					: undefined,
			},
		});
	}
}
