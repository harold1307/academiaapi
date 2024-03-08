import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateCronogramaMatriculacion } from "../../Domain/ICreateCronogramaMatriculacion";
import type { ICronogramaMatriculacion } from "../../Domain/ICronogramaMatriculacion";
import type {
	ICronogramaMatriculacionRepository,
	UpdateCronogramaMatriculacionParams,
} from "../../Domain/ICronogramaMatriculacionRepository";

@injectable()
export class CronogramaMatriculacionRepository
	implements ICronogramaMatriculacionRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ICronogramaMatriculacion[]> {
		return this._client.cronogramaMatriculacion.findMany({
			include: {
				sede: true,
				programa: true,
				modalidad: true,
			},
		});
	}
	async getById(id: string): Promise<ICronogramaMatriculacion | null> {
		return this._client.cronogramaMatriculacion.findUnique({
			where: {
				id,
			},
			include: {
				sede: true,
				programa: true,
				modalidad: true,
			},
		});
	}
	async deleteById(id: string): Promise<ICronogramaMatriculacion> {
		return this._client.cronogramaMatriculacion.delete({
			where: { id },
			include: {
				sede: true,
				programa: true,
				modalidad: true,
			},
		});
	}

	async create({
		programaId,
		sedeId,
		periodoId,
		modalidadId,
		...data
	}: ICreateCronogramaMatriculacion): Promise<ICronogramaMatriculacion> {
		return this._client.cronogramaMatriculacion.create({
			data: {
				...data,
				periodo: { connect: { id: periodoId } },
				programa: { connect: { id: programaId } },
				sede: { connect: { id: sedeId } },
				modalidad: modalidadId ? { connect: { id: modalidadId } } : undefined,
			},
			include: {
				sede: true,
				programa: true,
				modalidad: true,
			},
		});
	}
	async update({
		id,
		data,
	}: UpdateCronogramaMatriculacionParams): Promise<ICronogramaMatriculacion> {
		return this._client.cronogramaMatriculacion.update({
			where: { id },
			data,
			include: {
				sede: true,
				programa: true,
				modalidad: true,
			},
		});
	}
}
