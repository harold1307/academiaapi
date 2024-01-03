import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type {
	IAsignatura,
	IAsignaturaWithIsUsed,
} from "../../Domain/IAsignatura";
import type { IAsignaturaRepository } from "../../Domain/IAsignaturaRepository";
import type { ICreateAsignatura } from "../../Domain/ICreateAsignatura";

@injectable()
export class AsignaturaRepository implements IAsignaturaRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IAsignaturaWithIsUsed[]> {
		const asignaturas = await this._client.asignatura.findMany({
			include: {
				_count: {
					select: {
						asignaturasEnMalla: true,
					},
				},
			},
		});

		return asignaturas.map(a => ({
			...a,
			enUso: !!a._count.asignaturasEnMalla,
		}));
	}

	getById(id: string): Promise<IAsignatura | null> {
		return this._client.asignatura.findUnique({
			where: { id },
		});
	}

	create(data: ICreateAsignatura): Promise<IAsignatura> {
		return this._client.asignatura.create({
			data,
		});
	}

	update(params: {
		id: string;
		asignatura: Partial<Omit<IAsignatura, "id" | "createdAt">>;
	}): Promise<IAsignatura> {
		return this._client.asignatura.update({
			where: { id: params.id },
			data: params.asignatura,
		});
	}

	deleteById(id: string): Promise<IAsignatura> {
		return this._client.asignatura.delete({ where: { id } });
	}
}
