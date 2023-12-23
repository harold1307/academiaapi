import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IInstitucionRepository } from "../../Domain/IInstitucionRepository";
import type { ICreateInstitucion } from "../DTOs/CreateInstitucionDTO";
import type { IUpdateInstitucion } from "../DTOs/UpdateInstitucionDTO";
import type { IInstitucion } from "../../Domain/IInstitucion";

@injectable()
export class InstitucionRepository implements IInstitucionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create(data: ICreateInstitucion) {
		return this._client.institucion.create({ data });
	}
	async getAll() {
		return this._client.institucion.findMany();
	}

	async getById(id: string) {
		return this._client.institucion.findUnique({ where: { id } });
	}

	async update({
		id,
		institucion,
	}: {
		id: string;
		institucion: IUpdateInstitucion;
	}) {
		return this._client.institucion.update({
			where: {
				id,
			},
			data: institucion,
		});
	}

	async deleteById(id: string): Promise<IInstitucion> {
		return this._client.institucion.delete({ where: { id } });
	}
}
