import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IMallaCurricular } from "../../Domain/IMallaCurricular";
import type { IMallaCurricularRepository } from "../../Domain/IMallaCurricularRepository";
import type { ICreateMallaCurricularOutput } from "../DTOs/CreateMallaCurricularDTO";
import type { IUpdateMallaCurricularOutput } from "../DTOs/UpdateMallaCurricularDTO";

@injectable()
export class MallaCurricularRepository implements IMallaCurricularRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create(data: ICreateMallaCurricularOutput) {
		return this._client.mallaCurricular.create({
			data: {
				...data,
				perfilEgreso: data.perfilEgreso || null,
				observaciones: data.observaciones || null,
			},
		});
	}
	async getAll() {
		return this._client.mallaCurricular.findMany();
	}

	async getById(id: string) {
		return this._client.mallaCurricular.findUnique({ where: { id } });
	}

	async update({
		id,
		mallaCurricular,
	}: {
		id: string;
		mallaCurricular: IUpdateMallaCurricularOutput;
	}) {
		return this._client.mallaCurricular.update({
			where: {
				id,
			},
			data: {
				...mallaCurricular,
				perfilEgreso: mallaCurricular.perfilEgreso || null,
				observaciones: mallaCurricular.observaciones || null,
			},
		});
	}

	async deleteById(id: string): Promise<IMallaCurricular> {
		return this._client.mallaCurricular.delete({ where: { id } });
	}
}
