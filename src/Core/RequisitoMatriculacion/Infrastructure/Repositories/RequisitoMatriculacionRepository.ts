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
		return this._client.requisitoMatriculacion.findMany({
			include: {
				modalidad: true,
				programa: true,
				sede: true,
				tipoDocumento: true,
			},
		});
	}
	async getById(id: string): Promise<IRequisitoMatriculacion | null> {
		return this._client.requisitoMatriculacion.findUnique({
			where: { id },
			include: {
				modalidad: true,
				programa: true,
				sede: true,
				tipoDocumento: true,
			},
		});
	}
	async deleteById(id: string): Promise<IRequisitoMatriculacion> {
		return this._client.requisitoMatriculacion.delete({
			where: { id },
			include: {
				modalidad: true,
				programa: true,
				sede: true,
				tipoDocumento: true,
			},
		});
	}

	async create({
		sedeId,
		modalidadId,
		programaId,
		periodoId,
		tipoDocumentoId,
		...data
	}: ICreateRequisitoMatriculacion): Promise<IRequisitoMatriculacion> {
		return this._client.requisitoMatriculacion.create({
			data: {
				...data,
				periodo: { connect: { id: periodoId } },
				tipoDocumento: { connect: { id: tipoDocumentoId } },
				sede: { connect: { id: sedeId } },
				modalidad: modalidadId ? { connect: { id: modalidadId } } : undefined,
				programa: programaId ? { connect: { id: programaId } } : undefined,
			},
			include: {
				modalidad: true,
				programa: true,
				sede: true,
				tipoDocumento: true,
			},
		});
	}
	async update({
		id,
		data: { tipoDocumentoId, sedeId, programaId, modalidadId, ...data },
	}: UpdateRequisitoMatriculacionParams): Promise<IRequisitoMatriculacion> {
		return this._client.requisitoMatriculacion.update({
			where: { id },
			data: {
				...data,
				tipoDocumento: tipoDocumentoId
					? { connect: { id: tipoDocumentoId } }
					: undefined,
				sede: sedeId ? { connect: { id: sedeId } } : undefined,
				modalidad: modalidadId ? { connect: { id: modalidadId } } : undefined,
				programa: programaId ? { connect: { id: programaId } } : undefined,
			},
			include: {
				modalidad: true,
				programa: true,
				sede: true,
				tipoDocumento: true,
			},
		});
	}
}
