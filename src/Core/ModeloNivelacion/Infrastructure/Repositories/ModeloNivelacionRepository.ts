import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateModeloNivelacion } from "../../Domain/ICreateModeloNivelacion";
import type { IModeloNivelacion } from "../../Domain/IModeloNivelacion";
import type {
	IModeloNivelacionRepository,
	IUpdateModeloNivelacionParams,
} from "../../Domain/IModeloNivelacionRepository";

@injectable()
export class ModeloNivelacionRepository implements IModeloNivelacionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IModeloNivelacion[]> {
		const nivelaciones = await this._client.modeloNivelacion.findMany();

		return nivelaciones.map(n => ({ ...n, enUso: false }));
	}
	async getById(id: string): Promise<IModeloNivelacion | null> {
		const nivelacion = await this._client.modeloNivelacion.findUnique({
			where: { id },
		});

		if (!nivelacion) return null;

		return {
			...nivelacion,
			enUso: false,
		};
	}
	async deleteById(id: string): Promise<IModeloNivelacion> {
		const nivelacion = await this._client.modeloNivelacion.delete({
			where: { id },
		});

		return { ...nivelacion, enUso: false };
	}

	async create(data: ICreateModeloNivelacion): Promise<IModeloNivelacion> {
		const nivelacion = await this._client.modeloNivelacion.create({ data });

		return {
			...nivelacion,
			enUso: false,
		};
	}
	async update({
		id,
		data,
	}: IUpdateModeloNivelacionParams): Promise<IModeloNivelacion> {
		const nivelacion = await this._client.modeloNivelacion.update({
			where: { id },
			data,
		});

		return {
			...nivelacion,
			enUso: false,
		};
	}
}
