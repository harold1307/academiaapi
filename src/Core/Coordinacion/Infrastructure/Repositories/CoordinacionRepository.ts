import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICoordinacion } from "../../Domain/ICoordinacion";
import type {
	ICoordinacionRepository,
	UpdateCoordinacionParams,
} from "../../Domain/ICoordinacionRepository";
import type { ICreateCoordinacion } from "../../Domain/ICreateCoordinacion";

@injectable()
export class CoordinacionRepository implements ICoordinacionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ICoordinacion[]> {
		const coordinaciones = await this._client.coordinacion.findMany({
			include: {
				programas: {
					take: 1,
				},
			},
		});

		return coordinaciones.map(({ programas, ...rest }) => ({
			...rest,
			enUso: programas.length > 0,
		}));
	}
	async getById(id: string): Promise<ICoordinacion | null> {
		const coordinacion = await this._client.coordinacion.findUnique({
			where: { id },
			include: {
				programas: {
					take: 1,
				},
			},
		});

		if (!coordinacion) return null;

		const { programas, ...rest } = coordinacion;

		return {
			...rest,
			enUso: programas.length > 0,
		};
	}
	async deleteById(id: string): Promise<ICoordinacion> {
		const coordinacion = await this._client.coordinacion.delete({
			where: { id },
		});

		return {
			...coordinacion,
			enUso: false,
		};
	}

	async create({
		sedeId,
		...data
	}: ICreateCoordinacion): Promise<ICoordinacion> {
		const coordinacion = await this._client.coordinacion.create({
			data: {
				...data,
				sede: {
					connect: { id: sedeId },
				},
			},
		});

		return {
			...coordinacion,
			enUso: false,
		};
	}
	async update({ id, data }: UpdateCoordinacionParams): Promise<ICoordinacion> {
		const coordinacion = await this._client.coordinacion.update({
			where: { id },
			data,
		});

		return {
			...coordinacion,
			enUso: false,
		};
	}
}
