import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IVarianteCursoWithCurso } from "../../Domain/IVarianteCursoWithCurso";
import type { IVarianteCurso } from "../../Domain/IVarianteCurso";
import type {
	ICreateVarianteCursoParams,
	IUpdateVarianteCursoByIdParams,
	IVarianteCursoRepository,
} from "../../Domain/IVarianteCursoRepository";
import type { IVarianteCursoWithAsignaturas } from "../../Domain/IVarianteCursoWithAsignaturas";

@injectable()
export class VarianteCursoRepository implements IVarianteCursoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create({
		cursoId,
		data,
	}: ICreateVarianteCursoParams): Promise<IVarianteCursoWithCurso> {
		const variante = await this._client.varianteCurso.create({
			data: { ...data, cursoId },
			include: {
				curso: {
					include: {
						_count: {
							select: {
								variantes: true,
							},
						},
					},
				},
			},
		});

		const { _count, ...rest } = variante.curso;

		return {
			...variante,
			curso: {
				...rest,
				variantesCount: _count.variantes,
			},
		};
	}

	getById(id: string): Promise<IVarianteCurso | null> {
		return this._client.varianteCurso.findUnique({
			where: {
				id,
			},
		});
	}

	withAsignaturasGetById(
		id: string,
	): Promise<IVarianteCursoWithAsignaturas | null> {
		return this._client.varianteCurso.findUnique({
			where: { id },
			include: {
				asignaturas: true,
			},
		});
	}

	updateById({
		id,
		data,
	}: IUpdateVarianteCursoByIdParams): Promise<IVarianteCurso> {
		return this._client.varianteCurso.update({
			where: { id },
			data,
		});
	}
}
