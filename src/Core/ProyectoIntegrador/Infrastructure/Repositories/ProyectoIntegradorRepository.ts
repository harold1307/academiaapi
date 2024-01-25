import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateProyectoIntegrador } from "../../Domain/ICreateProyectoIntegrador";
import type { IProyectoIntegrador } from "../../Domain/IProyectoIntegrador";
import type {
	IProyectoIntegradorRepository,
	IUpdateProyectoIntegradorParams,
} from "../../Domain/IProyectoIntegradorRepository";

@injectable()
export class ProyectoIntegradorRepository
	implements IProyectoIntegradorRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IProyectoIntegrador[]> {
		const proyectos = await this._client.proyectoIntegrador.findMany();
		return proyectos.map(p => ({ ...p, enUso: false }));
	}
	async getById(id: string): Promise<IProyectoIntegrador | null> {
		const proyecto = await this._client.proyectoIntegrador.findUnique({
			where: { id },
		});

		if (!proyecto) return null;

		return { ...proyecto, enUso: false };
	}
	async deleteById(id: string): Promise<IProyectoIntegrador> {
		const proyecto = await this._client.proyectoIntegrador.delete({
			where: { id },
		});

		return { ...proyecto, enUso: false };
	}

	async create(data: ICreateProyectoIntegrador): Promise<IProyectoIntegrador> {
		const proyecto = await this._client.proyectoIntegrador.create({
			data,
		});

		return { ...proyecto, enUso: false };
	}
	async update({
		id,
		data,
	}: IUpdateProyectoIntegradorParams): Promise<IProyectoIntegrador> {
		const proyecto = await this._client.proyectoIntegrador.update({
			where: { id },
			data,
		});

		return { ...proyecto, enUso: false };
	}
}
