import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateMallaCurricular } from "../../Domain/ICreateMallaCurricular";
import type { IMallaCurricular } from "../../Domain/IMallaCurricular";
import type {
	IMallaCurricularRepository,
	UpdateMallaCurricularParams,
} from "../../Domain/IMallaCurricularRepository";

@injectable()
export class MallaCurricularRepository implements IMallaCurricularRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create({
		modalidadId,
		programaId,
		tituloObtenidoId,
		...data
	}: ICreateMallaCurricular) {
		const malla = await this._client.mallaCurricular.create({
			data: {
				...data,
				modalidad: { connect: { id: modalidadId } },
				programa: { connect: { id: programaId } },
				tituloObtenido: { connect: { id: tituloObtenidoId } },
			},
		});

		return {
			...malla,
			enUso: false,
		};
	}
	async getAll() {
		const mallas = await this._client.mallaCurricular.findMany({
			include: {
				asignaturasEnMalla: {
					take: 1,
				},
				lugaresEjecucion: {
					take: 1,
				},
			},
		});

		return mallas.map(({ asignaturasEnMalla, lugaresEjecucion, ...rest }) => ({
			...rest,
			enUso: asignaturasEnMalla.length > 0 || lugaresEjecucion.length > 0,
		}));
	}

	async getById(id: string) {
		const malla = await this._client.mallaCurricular.findUnique({
			where: { id },
			include: {
				asignaturasEnMalla: {
					take: 1,
				},
				lugaresEjecucion: {
					take: 1,
				},
			},
		});

		if (!malla) return null;

		const { asignaturasEnMalla, lugaresEjecucion, ...rest } = malla;

		return {
			...rest,
			enUso: asignaturasEnMalla.length > 0 || lugaresEjecucion.length > 0,
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
				asignaturasEnMalla: {
					take: 1,
				},
				lugaresEjecucion: {
					take: 1,
				},
			},
		});

		const { asignaturasEnMalla, lugaresEjecucion, ...rest } = malla;

		return {
			...rest,
			enUso: asignaturasEnMalla.length > 0 || lugaresEjecucion.length > 0,
		};
	}

	async deleteById(id: string): Promise<IMallaCurricular> {
		const malla = await this._client.mallaCurricular.delete({
			where: { id },
		});

		return {
			...malla,
			enUso: false,
		};
	}
}
