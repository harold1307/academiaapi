import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateMallaCurricular } from "../../Domain/ICreateMallaCurricular";
import type { IMallaCurricular } from "../../Domain/IMallaCurricular";
import type {
	IMallaCurricularRepository,
	IUpdateMallaCurricularParams,
} from "../../Domain/IMallaCurricularRepository";

@injectable()
export class MallaCurricularRepository implements IMallaCurricularRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create({ modalidadId, ...data }: ICreateMallaCurricular) {
		return this._client.mallaCurricular.create({
			data: {
				...data,
				modalidad: { connect: { nombre: modalidadId } },
			},
		});
	}
	async getAll() {
		return this._client.mallaCurricular.findMany();
	}

	async getById(id: string) {
		return this._client.mallaCurricular.findUnique({
			where: { id },
		});
	}

	async update({
		id,
		data: { modalidadId, ...data },
	}: IUpdateMallaCurricularParams) {
		return this._client.mallaCurricular.update({
			where: {
				id,
			},
			data: {
				...data,
				...(modalidadId
					? { modalidad: { connect: { nombre: modalidadId } } }
					: {}),
			},
		});
	}

	async deleteById(id: string): Promise<IMallaCurricular> {
		return this._client.mallaCurricular.delete({ where: { id } });
	}
}
