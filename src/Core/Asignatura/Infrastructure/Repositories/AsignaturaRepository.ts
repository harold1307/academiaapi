import { inject, injectable } from "inversify";
import type { PrismaClient } from "@prisma/client";

import type { IAsignaturaRepository } from "../../Domain/IAsignaturaRepository";
import type { IAsignatura } from "../../Domain/IAsignatura";
import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateAsignatura } from "../../Domain/ICreateAsignatura";

@injectable()
export class AsignaturaRepository implements IAsignaturaRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<IAsignatura[]> {
		return this._client.asignatura.findMany();
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
