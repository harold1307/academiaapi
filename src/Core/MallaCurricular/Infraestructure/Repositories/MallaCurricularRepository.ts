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
		const mallas = await this._client.mallaCurricular.findMany({});

		return mallas.map(({ ...rest }) => ({
			...rest,
			enUso: false,
		}));
	}

	async getById(id: string) {
		const malla = await this._client.mallaCurricular.findUnique({
			where: { id },
		});

		if (!malla) return null;

		const { ...rest } = malla;

		return {
			...rest,
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
		});

		const { ...rest } = malla;

		return {
			...rest,
			enUso: false,
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
