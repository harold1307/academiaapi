import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
// import type { ICreateNivelAcademico } from "../../Domain/ICreateNivelAcademico";
import type { INivelAcademico } from "../../Domain/INivelAcademico";
import type {
	INivelAcademicoRepository,
	UpdateNivelAcademicoParams,
} from "../../Domain/INivelAcademicoRepository";

@injectable()
export class NivelAcademicoRepository implements INivelAcademicoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<INivelAcademico[]> {
		const niveles = await this._client.nivelAcademico.findMany({
			include: {
				sesion: true,
			},
		});

		return niveles.map(({ sesion, ...rest }) => ({
			...rest,
			sesion: {
				...sesion,
				enUso: true,
			},
		}));
	}

	async getById(id: string): Promise<INivelAcademico | null> {
		const nivel = await this._client.nivelAcademico.findUnique({
			where: { id },
			include: {
				sesion: true,
			},
		});

		if (!nivel) return null;

		const { sesion, ...rest } = nivel;

		return {
			...rest,
			sesion: {
				...sesion,
				enUso: true,
			},
		};
	}

	async deleteById(id: string): Promise<INivelAcademico> {
		const nivel = await this._client.nivelAcademico.delete({
			where: { id },
			include: {
				sesion: true,
			},
		});

		const { sesion, ...rest } = nivel;

		return {
			...rest,
			sesion: {
				...sesion,
				enUso: true,
			},
		};
	}

	// async create({
	// 	sesionId,
	// 	paraleloId,
	// 	nivelMallaId,
	// 	modeloEvaluativoId,
	// 	...data
	// }: ICreateNivelAcademico): Promise<INivelAcademico> {
	// 	const asignaturasEnMalla =
	// 		await this._client.asignaturaEnNivelMalla.findMany({
	// 			where: { nivelMallaId },
	// 		});

	// 	const nivel =await this._client.nivelAcademico.create({
	// 		data: {
	// 			...data,
	// 			sesion: { connect: { id: sesionId } },
	// 			paralelo: { connect: { nombre: paraleloId } },
	// 			nivelMalla: { connect: { id: nivelMallaId } },
	// 			modeloEvaluativo: { connect: { id: modeloEvaluativoId } },
	// 			materias: {
	// 				createMany: {
	// 					data: asignaturasEnMalla.map(asignaturaEnMalla => ({
	// 						validaParaCreditos: asignaturaEnMalla.validaParaCredito,
	// 						validaParaPromedio: asignaturaEnMalla.validaParaPromedio,
	// 						asignaturaEnNivelMallaId: asignaturaEnMalla.id,
	// 						materiaExterna: false,
	// 						practicasPermitidas: false,
	// 					})),
	// 				},
	// 			},
	// 		},
	// 	});
	// }

	async update({
		id,
		data: { paraleloId, modeloEvaluativoId, ...data },
	}: UpdateNivelAcademicoParams): Promise<INivelAcademico> {
		const nivel = await this._client.nivelAcademico.update({
			where: { id },
			data: {
				...data,
				paralelo: paraleloId ? { connect: { nombre: paraleloId } } : undefined,
				modeloEvaluativo: modeloEvaluativoId
					? { connect: { id: modeloEvaluativoId } }
					: undefined,
			},
			include: {
				sesion: true,
			},
		});

		const { sesion, ...rest } = nivel;

		return {
			...rest,
			sesion: {
				...sesion,
				enUso: true,
			},
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
		) => Promise<INivelAcademico>,
	): Promise<INivelAcademico> {
		return this._client.$transaction(tx);
	}
}
