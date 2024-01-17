import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateModalidad } from "../../Domain/ICreateModalidad";
import type { IModalidad } from "../../Domain/IModalidad";
import type {
	IModalidadRepository,
	IUpdateModalidadParams,
} from "../../Domain/IModalidadRepository";

@injectable()
export class ModalidadRepository implements IModalidadRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IModalidad[]> {
		const modalidades = await this._client.modalidad.findMany({
			include: {
				mallas: {
					take: 1,
				},
			},
		});

		return modalidades.map(({ mallas, ...rest }) => ({
			...rest,
			enUso: mallas.length > 0,
		}));
	}

	async getById(id: string): Promise<IModalidad | null> {
		const modalidad = await this._client.modalidad.findUnique({
			where: { nombre: id },
			include: {
				mallas: {
					take: 1,
				},
			},
		});

		if (!modalidad) return null;

		const { mallas, ...rest } = modalidad;

		return {
			...rest,
			enUso: mallas.length > 0,
		};
	}

	async deleteById(id: string): Promise<IModalidad> {
		const modalidad = await this._client.modalidad.delete({
			where: { nombre: id },
		});

		return {
			...modalidad,
			enUso: false,
		};
	}

	async create(data: ICreateModalidad): Promise<IModalidad> {
		const modalidad = await this._client.modalidad.create({
			data,
		});

		return {
			...modalidad,
			enUso: false,
		};
	}

	async update({ data, id }: IUpdateModalidadParams): Promise<IModalidad> {
		const modalidad = await this._client.modalidad.update({
			where: { nombre: id },
			data,
			include: {
				mallas: {
					take: 1,
				},
			},
		});

		const { mallas, ...rest } = modalidad;

		return {
			...rest,
			enUso: mallas.length > 0,
		};
	}
}
