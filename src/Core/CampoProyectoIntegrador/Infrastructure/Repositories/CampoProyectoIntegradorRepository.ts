import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICampoProyectoIntegrador } from "../../Domain/ICampoProyectoIntegrador";
import type {
	ICampoProyectoIntegradorRepository,
	IUpdateCampoProyectoIntegradorParams,
} from "../../Domain/ICampoProyectoIntegradorRepository";
import type { ICreateCampoProyectoIntegrador } from "../../Domain/ICreateCampoProyectoIntegrador";

@injectable()
export class CampoProyectoIntegradorRepository
	implements ICampoProyectoIntegradorRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<ICampoProyectoIntegrador[]> {
		return this._client.campoProyectoIntegrador.findMany();
	}
	getById(id: string): Promise<ICampoProyectoIntegrador | null> {
		return this._client.campoProyectoIntegrador.findUnique({ where: { id } });
	}
	deleteById(id: string): Promise<ICampoProyectoIntegrador> {
		return this._client.campoProyectoIntegrador.delete({ where: { id } });
	}
	create({
		proyectoIntegradorId,
		...data
	}: ICreateCampoProyectoIntegrador): Promise<ICampoProyectoIntegrador> {
		return this._client.campoProyectoIntegrador.create({
			data: {
				...data,
				proyectoIntegrador: {
					connect: { id: proyectoIntegradorId },
				},
			},
		});
	}
	update({
		id,
		data,
	}: IUpdateCampoProyectoIntegradorParams): Promise<ICampoProyectoIntegrador> {
		return this._client.campoProyectoIntegrador.update({
			where: { id },
			data,
		});
	}
}
