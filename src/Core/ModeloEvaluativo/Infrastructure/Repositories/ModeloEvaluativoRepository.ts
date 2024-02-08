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
		const modelos = await this._client.modeloEvaluativo.findMany({
			include: {
				asignaturasEnCursoEscuela: {
					take: 1,
				},
				asignaturasEnVarianteCurso: {
					take: 1,
				},
				nivelesAcademicos: {
					take: 1,
				},
			},
		});

		return modelos.map(
			({
				asignaturasEnCursoEscuela,
				asignaturasEnVarianteCurso,
				nivelesAcademicos,
				...rest
			}) => ({
				...rest,
				enUso:
					asignaturasEnCursoEscuela.length > 0 ||
					asignaturasEnVarianteCurso.length > 0 ||
					nivelesAcademicos.length > 0,
			}),
		);
	}
	async getById(id: string): Promise<IModeloEvaluativo | null> {
		const modelo = await this._client.modeloEvaluativo.findUnique({
			where: { id },
			include: {
				asignaturasEnCursoEscuela: {
					take: 1,
				},
				asignaturasEnVarianteCurso: {
					take: 1,
				},
				nivelesAcademicos: {
					take: 1,
				},
			},
		});

		if (!modelo) return null;

		const {
			asignaturasEnCursoEscuela,
			asignaturasEnVarianteCurso,
			nivelesAcademicos,
			...rest
		} = modelo;

		return {
			...rest,
			enUso:
				asignaturasEnCursoEscuela.length > 0 ||
				asignaturasEnVarianteCurso.length > 0 ||
				nivelesAcademicos.length > 0,
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
			include: {
				asignaturasEnCursoEscuela: {
					take: 1,
				},
				asignaturasEnVarianteCurso: {
					take: 1,
				},
				nivelesAcademicos: {
					take: 1,
				},
			},
		});

		const {
			asignaturasEnCursoEscuela,
			asignaturasEnVarianteCurso,
			nivelesAcademicos,
			...rest
		} = modelo;

		return {
			...rest,
			enUso:
				asignaturasEnCursoEscuela.length > 0 ||
				asignaturasEnVarianteCurso.length > 0 ||
				nivelesAcademicos.length > 0,
		};
	}
}
