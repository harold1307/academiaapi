import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsignaturaModuloEnMalla } from "../../Domain/IAsignaturaModuloEnMalla";
import type {
	IAsignaturaModuloEnMallaRepository,
	UpdateAsignaturaModuloEnMallaParams,
} from "../../Domain/IAsignaturaModuloEnMallaRepository";
import type { ICreateAsignaturaModuloEnMalla } from "../../Domain/ICreateAsignaturaModuloEnMalla";

@injectable()
export class AsignaturaModuloEnMallaRepository
	implements IAsignaturaModuloEnMallaRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<IAsignaturaModuloEnMalla[]> {
		return this._client.asignaturaModuloEnMalla.findMany();
	}
	getById(id: string): Promise<IAsignaturaModuloEnMalla | null> {
		return this._client.asignaturaModuloEnMalla.findFirst({ where: { id } });
	}
	deleteById(id: string): Promise<IAsignaturaModuloEnMalla> {
		return this._client.asignaturaModuloEnMalla.delete({ where: { id } });
	}

	create({
		mallaId,
		asignaturaId,
		campoFormacionId,
		areaConocimientoId,
		...data
	}: ICreateAsignaturaModuloEnMalla): Promise<IAsignaturaModuloEnMalla> {
		return this._client.asignaturaModuloEnMalla.create({
			data: {
				...data,
				malla: { connect: { id: mallaId } },
				asignatura: { connect: { id: asignaturaId } },
				campoFormacion: { connect: { id: campoFormacionId } },
				areaConocimiento: { connect: { id: areaConocimientoId } },
			},
		});
	}
	update({
		id,
		data: { campoFormacionId, areaConocimientoId, ...data },
	}: UpdateAsignaturaModuloEnMallaParams): Promise<IAsignaturaModuloEnMalla> {
		return this._client.asignaturaModuloEnMalla.update({
			where: { id },
			data: {
				...data,
				campoFormacion: campoFormacionId
					? { connect: { id: campoFormacionId } }
					: undefined,
				areaConocimiento: areaConocimientoId
					? { connect: { id: areaConocimientoId } }
					: undefined,
			},
		});
	}
}
