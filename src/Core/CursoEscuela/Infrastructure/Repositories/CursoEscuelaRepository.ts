import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateCursoEscuela } from "../../Domain/ICreateCursoEscuela";
import type { ICursoEscuela } from "../../Domain/ICursoEscuela";
import type {
	GetAllCursoEscuelasParams,
	ICursoEscuelaRepository,
	UpdateCursoEscuelaParams,
} from "../../Domain/ICursoEscuelaRepository";
import type { ICursoEscuelaWithProgramas } from "../../Domain/ICursoEscuelaWithProgramas";

@injectable()
export class CursoEscuelaRepository implements ICursoEscuelaRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(params?: GetAllCursoEscuelasParams): Promise<ICursoEscuela[]> {
		const { filters } = params || {};
		const cursos = await this._client.cursoEscuela.findMany({
			where: filters,
		});

		return cursos.map(({ ...rest }) => ({
			...rest,
			enUso: false,
		}));
	}

	async getById(id: string): Promise<ICursoEscuela | null> {
		const curso = await this._client.cursoEscuela.findUnique({ where: { id } });

		if (!curso) return null;

		const { ...rest } = curso;

		return {
			...rest,
			enUso: false,
		};
	}

	async deleteById(id: string): Promise<ICursoEscuela> {
		const curso = await this._client.cursoEscuela.delete({ where: { id } });

		return {
			...curso,
			enUso: false,
		};
	}

	async create({
		paraleloId,
		plantillaId,
		sesionId,
		periodoId,
		...rest
	}: ICreateCursoEscuela): Promise<ICursoEscuela> {
		const curso = await this._client.cursoEscuela.create({
			data: {
				...rest,
				paralelo: {
					connect: {
						id: paraleloId,
					},
				},
				sesion: {
					connect: {
						id: sesionId,
					},
				},
				periodo: {
					connect: {
						id: periodoId,
					},
				},
				plantilla: plantillaId
					? {
							connect: {
								id: plantillaId,
							},
						}
					: undefined,
			},
		});

		return {
			...curso,
			enUso: false,
		};
	}

	transaction(
		tx: (
			prisma: Omit<
				PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
				| "$transaction"
				| "$connect"
				| "$disconnect"
				| "$on"
				| "$use"
				| "$extends"
			>,
		) => Promise<ICursoEscuela>,
	): Promise<ICursoEscuela> {
		return this._client.$transaction(tx);
	}

	async update({
		id,
		data: { sesionId, paraleloId, ...data },
	}: UpdateCursoEscuelaParams): Promise<ICursoEscuela> {
		const curso = await this._client.cursoEscuela.update({
			where: { id },
			data: {
				...data,
				sesion: sesionId ? { connect: { id: sesionId } } : undefined,
				paralelo: paraleloId ? { connect: { id: paraleloId } } : undefined,
			},
		});

		const { ...rest } = curso;

		return {
			...rest,
			enUso: false,
		};
	}

	async withProgramasGetById(
		id: string,
	): Promise<ICursoEscuelaWithProgramas | null> {
		const curso = await this._client.cursoEscuela.findUnique({
			where: { id },
			include: {
				programas: {
					include: {
						modalidad: true,
						malla: true,
						programa: true,
					},
				},
			},
		});

		if (!curso) return null;

		const { ...rest } = curso;

		return {
			...rest,
			enUso: false,
		};
	}
}
