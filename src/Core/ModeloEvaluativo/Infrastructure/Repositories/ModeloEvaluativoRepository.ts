import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateModeloEvaluativo } from "../../Domain/ICreateModeloEvaluativo";
import type { IModeloEvaluativo } from "../../Domain/IModeloEvaluativo";
import type {
	IModeloEvaluativoRepository,
	IUpdateModeloEvaluativoParams,
} from "../../Domain/IModeloEvaluativoRepository";

@injectable()
export class ModeloEvaluativoRepository implements IModeloEvaluativoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IModeloEvaluativo[]> {
		const modelos = await this._client.modeloEvaluativo.findMany();

		return modelos.map(({ ...rest }) => ({
			...rest,
			enUso: false,
		}));
	}
	async getById(id: string): Promise<IModeloEvaluativo | null> {
		const modelo = await this._client.modeloEvaluativo.findUnique({
			where: { id },
		});

		if (!modelo) return null;

		const { ...rest } = modelo;

		return {
			...rest,
			enUso: false,
		};
	}
	async deleteById(id: string): Promise<IModeloEvaluativo> {
		const modelo = await this._client.modeloEvaluativo.delete({
			where: { id },
		});

		return {
			...modelo,
			enUso: false,
		};
	}

	async create(data: ICreateModeloEvaluativo): Promise<IModeloEvaluativo> {
		const modelo = await this._client.modeloEvaluativo.create({ data });

		return {
			...modelo,
			enUso: false,
		};
	}
	async update({
		id,
		data,
	}: IUpdateModeloEvaluativoParams): Promise<IModeloEvaluativo> {
		const modelo = await this._client.modeloEvaluativo.update({
			where: { id },
			data,
		});

		const { ...rest } = modelo;

		return {
			...rest,
			enUso: false,
		};
	}
}
