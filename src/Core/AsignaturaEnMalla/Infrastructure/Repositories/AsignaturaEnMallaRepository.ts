import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsignaturaEnMalla } from "../../Domain/IAsignaturaEnMalla";
import type { IAsignaturaEnMallaRepository } from "../../Domain/IAsignaturaEnMallaRepository";
import type { ICreateAsignaturaEnMalla } from "../../Domain/ICreateAsignaturaEnMalla";

@injectable()
export class AsignaturaEnMallaRepository
	implements IAsignaturaEnMallaRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create(data: ICreateAsignaturaEnMalla): Promise<IAsignaturaEnMalla> {
		const asignatura = await this._client.asignaturaEnMalla.create({
			data,
			include: {
				ejeFormativo: true,
				areaConocimiento: true,
				campoFormacion: true,
			},
		});

		return {
			...asignatura,
			areaConocimiento: asignatura.areaConocimiento
				? {
						...asignatura.areaConocimiento,
						enUso: true,
					}
				: null,
			ejeFormativo: asignatura.ejeFormativo
				? { ...asignatura.ejeFormativo, enUso: true }
				: null,
			campoFormacion: asignatura.campoFormacion
				? { ...asignatura.campoFormacion, enUso: true }
				: null,
		};
	}
}
