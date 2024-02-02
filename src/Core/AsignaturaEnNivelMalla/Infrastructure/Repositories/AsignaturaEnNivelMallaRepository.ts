import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsignaturaEnNivelMalla } from "../../Domain/IAsignaturaEnNivelMalla";
import type {
	IAsignaturaEnNivelMallaRepository,
	UpdateAsignaturaEnNivelMallaParams,
} from "../../Domain/IAsignaturaEnNivelMallaRepository";
import type { ICreateAsignaturaEnNivelMalla } from "../../Domain/ICreateAsignaturaEnNivelMalla";

@injectable()
export class AsignaturaEnNivelMallaRepository
	implements IAsignaturaEnNivelMallaRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<IAsignaturaEnNivelMalla[]> {
		return this._client.asignaturaEnNivelMalla.findMany();
	}
	getById(id: string): Promise<IAsignaturaEnNivelMalla | null> {
		return this._client.asignaturaEnNivelMalla.findFirst({ where: { id } });
	}
	deleteById(id: string): Promise<IAsignaturaEnNivelMalla> {
		return this._client.asignaturaEnNivelMalla.delete({ where: { id } });
	}
	update({
		id,
		data: { ejeFormativoId, campoFormacionId, areaConocimientoId },
	}: UpdateAsignaturaEnNivelMallaParams): Promise<IAsignaturaEnNivelMalla> {
		return this._client.asignaturaEnNivelMalla.update({
			where: { id },
			data: {
				ejeFormativo: { connect: { id: ejeFormativoId } },
				campoFormacion:
					campoFormacionId !== undefined
						? campoFormacionId
							? { connect: { id: campoFormacionId } }
							: { disconnect: true }
						: undefined,
				areaConocimiento: { connect: { id: areaConocimientoId } },
			},
		});
	}

	create({
		asignaturaId,
		nivelMallaId,
		ejeFormativoId,
		campoFormacionId,
		areaConocimientoId,
		...data
	}: ICreateAsignaturaEnNivelMalla): Promise<IAsignaturaEnNivelMalla> {
		return this._client.asignaturaEnNivelMalla.create({
			data: {
				...data,
				asignatura: { connect: { id: asignaturaId } },
				nivelMalla: { connect: { id: nivelMallaId } },
				ejeFormativo: { connect: { id: ejeFormativoId } },
				campoFormacion: campoFormacionId
					? { connect: { id: campoFormacionId } }
					: undefined,
				areaConocimiento: { connect: { id: areaConocimientoId } },
			},
		});
	}
}
