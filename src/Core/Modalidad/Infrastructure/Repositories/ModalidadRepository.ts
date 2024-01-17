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

	getAll(): Promise<IModalidad[]> {
		return this._client.modalidad.findMany();
	}

	getById(id: string): Promise<IModalidad | null> {
		return this._client.modalidad.findUnique({ where: { nombre: id } });
	}

	deleteById(id: string): Promise<IModalidad> {
		return this._client.modalidad.delete({ where: { nombre: id } });
	}

	create(data: ICreateModalidad): Promise<IModalidad> {
		return this._client.modalidad.create({
			data,
		});
	}

	update({ data, id }: IUpdateModalidadParams): Promise<IModalidad> {
		return this._client.modalidad.update({ where: { nombre: id }, data });
	}
}
