import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateCurso } from "../../Domain/ICreateCurso";
import type { ICurso } from "../../Domain/ICurso";
import type {
	ICursoRepository,
	UpdateCursoParams,
} from "../../Domain/ICursoRepository";
import type { ICursoWithVariantes } from "../../Domain/ICursoWithVariantes";

@injectable()
export class CursoRepository implements ICursoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}
	async getAll(): Promise<ICurso[]> {
		const cursos = await this._client.curso.findMany({
			include: {
				_count: {
					select: {
						variantes: true,
					},
				},
			},
		});

		return cursos.map(({ _count, ...c }) => ({
			...c,
			variantesCount: _count.variantes,
		}));
	}

	async getById(id: string): Promise<ICursoWithVariantes | null> {
		const curso = await this._client.curso.findUnique({
			where: { id },
			include: { variantes: true },
		});

		if (!curso) return null;

		return {
			...curso,
			variantesCount: curso.variantes.length,
		};
	}
	async deleteById(id: string): Promise<ICurso> {
		const curso = await this._client.curso.delete({
			where: { id },
			include: {
				_count: {
					select: {
						variantes: true,
					},
				},
			},
		});

		const { _count, ...rest } = curso;

		return {
			...rest,
			variantesCount: _count.variantes,
		};
	}

	async create(data: ICreateCurso): Promise<ICurso> {
		const curso = await this._client.curso.create({ data });

		return {
			...curso,
			variantesCount: 0,
		};
	}

	async update({ id, data }: UpdateCursoParams): Promise<ICurso> {
		const curso = await this._client.curso.update({
			where: { id: id },
			data,
			include: {
				_count: {
					select: {
						variantes: true,
					},
				},
			},
		});

		const { _count, ...rest } = curso;

		return {
			...rest,
			variantesCount: _count.variantes,
		};
	}

	async getAllVarianteCursoFromCursoId(
		cursoId: string,
	): Promise<ICursoWithVariantes | null> {
		const curso = await this._client.curso.findUnique({
			where: { id: cursoId },
			include: {
				variantes: true,
			},
		});

		if (!curso) return null;

		return {
			...curso,
			variantesCount: curso.variantes.length,
		};
	}
}
