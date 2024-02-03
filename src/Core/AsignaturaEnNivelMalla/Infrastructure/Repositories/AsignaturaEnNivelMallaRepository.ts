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

	async getAll(): Promise<IAsignaturaEnNivelMalla[]> {
		const asignaturas = await this._client.asignaturaEnNivelMalla.findMany({
			include: {
				ejeFormativo: true,
				areaConocimiento: true,
				campoFormacion: true,
				asignatura: true,
			},
		});

		return asignaturas.map(
			({
				ejeFormativo,
				areaConocimiento,
				campoFormacion,
				asignatura,
				...rest
			}) => ({
				...rest,
				asignatura: {
					...asignatura,
					enUso: true,
				},
				ejeFormativo: {
					...ejeFormativo,
					enUso: true,
				},
				areaConocimiento: {
					...areaConocimiento,
					enUso: true,
				},
				campoFormacion: campoFormacion
					? {
							...campoFormacion,
							enUso: true,
						}
					: null,
			}),
		);
	}
	async getById(id: string): Promise<IAsignaturaEnNivelMalla | null> {
		const asignaturaEnNivel =
			await this._client.asignaturaEnNivelMalla.findUnique({
				where: { id },
				include: {
					ejeFormativo: true,
					areaConocimiento: true,
					campoFormacion: true,
					asignatura: true,
				},
			});

		if (!asignaturaEnNivel) return null;

		const {
			ejeFormativo,
			areaConocimiento,
			campoFormacion,
			asignatura,
			...rest
		} = asignaturaEnNivel;

		return {
			...rest,
			asignatura: {
				...asignatura,
				enUso: true,
			},
			ejeFormativo: {
				...ejeFormativo,
				enUso: true,
			},
			areaConocimiento: {
				...areaConocimiento,
				enUso: true,
			},
			campoFormacion: campoFormacion
				? {
						...campoFormacion,
						enUso: true,
					}
				: null,
		};
	}
	async deleteById(id: string): Promise<IAsignaturaEnNivelMalla> {
		const asignaturaEnNivel = await this._client.asignaturaEnNivelMalla.delete({
			where: { id },
			include: {
				ejeFormativo: true,
				areaConocimiento: true,
				campoFormacion: true,
				asignatura: true,
			},
		});

		const {
			ejeFormativo,
			areaConocimiento,
			campoFormacion,
			asignatura,
			...rest
		} = asignaturaEnNivel;

		return {
			...rest,
			asignatura: {
				...asignatura,
				enUso: true,
			},
			ejeFormativo: {
				...ejeFormativo,
				enUso: true,
			},
			areaConocimiento: {
				...areaConocimiento,
				enUso: true,
			},
			campoFormacion: campoFormacion
				? {
						...campoFormacion,
						enUso: true,
					}
				: null,
		};
	}
	async update({
		id,
		data: { ejeFormativoId, campoFormacionId, areaConocimientoId },
	}: UpdateAsignaturaEnNivelMallaParams): Promise<IAsignaturaEnNivelMalla> {
		const asignaturaEnNivel = await this._client.asignaturaEnNivelMalla.update({
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
			include: {
				ejeFormativo: true,
				areaConocimiento: true,
				campoFormacion: true,
				asignatura: true,
			},
		});

		const {
			ejeFormativo,
			areaConocimiento,
			campoFormacion,
			asignatura,
			...rest
		} = asignaturaEnNivel;

		return {
			...rest,
			asignatura: {
				...asignatura,
				enUso: true,
			},
			ejeFormativo: {
				...ejeFormativo,
				enUso: true,
			},
			areaConocimiento: {
				...areaConocimiento,
				enUso: true,
			},
			campoFormacion: campoFormacion
				? {
						...campoFormacion,
						enUso: true,
					}
				: null,
		};
	}

	async create({
		asignaturaId,
		nivelMallaId,
		ejeFormativoId,
		campoFormacionId,
		areaConocimientoId,
		...data
	}: ICreateAsignaturaEnNivelMalla): Promise<IAsignaturaEnNivelMalla> {
		const asignaturaEnNivel = await this._client.asignaturaEnNivelMalla.create({
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
			include: {
				ejeFormativo: true,
				areaConocimiento: true,
				campoFormacion: true,
				asignatura: true,
			},
		});

		const {
			ejeFormativo,
			areaConocimiento,
			campoFormacion,
			asignatura,
			...rest
		} = asignaturaEnNivel;

		return {
			...rest,
			asignatura: {
				...asignatura,
				enUso: true,
			},
			ejeFormativo: {
				...ejeFormativo,
				enUso: true,
			},
			areaConocimiento: {
				...areaConocimiento,
				enUso: true,
			},
			campoFormacion: campoFormacion
				? {
						...campoFormacion,
						enUso: true,
					}
				: null,
		};
	}
}
