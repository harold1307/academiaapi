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

	getAll(): Promise<ICronogramaMatriculacion[]> {
		return this._client.cronogramaMatriculacion.findMany();
	}
	getById(id: string): Promise<ICronogramaMatriculacion | null> {
		return this._client.cronogramaMatriculacion.findUnique({
			where: {
				id,
			},
		});
	}
	deleteById(id: string): Promise<ICronogramaMatriculacion> {
		return this._client.cronogramaMatriculacion.delete({ where: { id } });
	}

	create({
		nivelId,
		periodoId,
		...data
	}: ICreateCronogramaMatriculacion): Promise<ICronogramaMatriculacion> {
		return this._client.cronogramaMatriculacion.create({
			data: {
				...data,
				nivel: { connect: { id: nivelId } },
				periodo: { connect: { id: periodoId } },
			},
		});
	}
	update({
		id,
		data,
	}: UpdateCronogramaMatriculacionParams): Promise<ICronogramaMatriculacion> {
		return this._client.cronogramaMatriculacion.update({ where: { id }, data });
	}
}
