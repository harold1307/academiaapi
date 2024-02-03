import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
// import type { ICreateMallaCurricular } from "../../Domain/ICreateMallaCurricular";
import type { IMallaCurricular } from "../../Domain/IMallaCurricular";
import type {
	IMallaCurricularRepository,
	UpdateMallaCurricularParams,
} from "../../Domain/IMallaCurricularRepository";

@injectable()
export class MallaCurricularRepository implements IMallaCurricularRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	// async create({
	// 	modalidadId,
	// 	programaId,
	// 	tituloObtenidoId,
	// 	...data
	// }: Omit<ICreateMallaCurricular, "niveles">) {
	// 	const malla = await this._client.mallaCurricular.create({
	// 		data: {
	// 			...data,
	// 			modalidad: { connect: { id: modalidadId } },
	// 			programa: { connect: { id: programaId } },
	// 			tituloObtenido: tituloObtenidoId
	// 				? { connect: { id: tituloObtenidoId } }
	// 				: undefined,
	// 		},
	// 		include: {
	// 			practicaComunitaria: true,
	// 			practicaPreProfesional: true,
	// 			tituloObtenido: true,
	// 		},
	// 	});

	// 	const { tituloObtenido, ...rest } = malla;

	// 	return {
	// 		...rest,
	// 		tituloObtenido: tituloObtenido
	// 			? { ...tituloObtenido, enUso: true }
	// 			: null,
	// 		enUso: false,
	// 	};
	// }
	async getAll() {
		const mallas = await this._client.mallaCurricular.findMany({
			include: {
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
			},
		});

		return mallas.map(({ tituloObtenido, ...rest }) => ({
			...rest,
			tituloObtenido: tituloObtenido
				? { ...tituloObtenido, enUso: true }
				: null,
			enUso: false,
		}));
	}

	async getById(id: string) {
		const malla = await this._client.mallaCurricular.findUnique({
			where: { id },
			include: {
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
			},
		});

		if (!malla) return null;

		const { tituloObtenido, ...rest } = malla;

		return {
			...rest,
			tituloObtenido: tituloObtenido
				? { ...tituloObtenido, enUso: true }
				: null,
			enUso: false,
		};
	}

	async update({
		id,
		data: { tituloObtenidoId, ...data },
	}: UpdateMallaCurricularParams) {
		const malla = await this._client.mallaCurricular.update({
			where: {
				id,
			},
			data: {
				...data,
				...(tituloObtenidoId
					? { tituloObtenido: { connect: { id: tituloObtenidoId } } }
					: {}),
			},
			include: {
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
			},
		});

		const { tituloObtenido, ...rest } = malla;

		return {
			...rest,
			tituloObtenido: tituloObtenido
				? { ...tituloObtenido, enUso: true }
				: null,
			enUso: false,
		};
	}

	async deleteById(id: string): Promise<IMallaCurricular> {
		const malla = await this._client.mallaCurricular.delete({
			where: { id },
			include: {
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
			},
		});

		const { tituloObtenido, ...rest } = malla;

		return {
			...rest,
			tituloObtenido: tituloObtenido
				? { ...tituloObtenido, enUso: true }
				: null,
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
		) => Promise<IMallaCurricular>,
	): Promise<IMallaCurricular> {
		return this._client.$transaction(tx);
	}
}
