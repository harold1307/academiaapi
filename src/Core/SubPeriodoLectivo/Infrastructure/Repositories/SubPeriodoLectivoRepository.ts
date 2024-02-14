import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateSubPeriodoLectivo } from "../../Domain/ICreateSubPeriodoLectivo";
import type { ISubPeriodoLectivo } from "../../Domain/ISubPeriodoLectivo";
import type {
	ISubPeriodoLectivoRepository,
	UpdateSubPeriodoLectivoParams,
} from "../../Domain/ISubPeriodoLectivoRepository";

@injectable()
export class SubPeriodoLectivoRepository
	implements ISubPeriodoLectivoRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ISubPeriodoLectivo[]> {
		return this._client.subPeriodoLectivo.findMany();
	}
	async getById(id: string): Promise<ISubPeriodoLectivo | null> {
		return this._client.subPeriodoLectivo.findUnique({ where: { id } });
	}
	async deleteById(id: string): Promise<ISubPeriodoLectivo> {
		return this._client.subPeriodoLectivo.delete({ where: { id } });
	}

	async create({
		periodoId,
		...data
	}: ICreateSubPeriodoLectivo): Promise<ISubPeriodoLectivo> {
		return this._client.subPeriodoLectivo.create({
			data: {
				...data,
				periodo: {
					connect: {
						id: periodoId,
					},
				},
			},
		});
	}
	async update({
		id,
		data,
	}: UpdateSubPeriodoLectivoParams): Promise<ISubPeriodoLectivo> {
		return this._client.subPeriodoLectivo.update({
			where: { id },
			data,
		});
	}
}
