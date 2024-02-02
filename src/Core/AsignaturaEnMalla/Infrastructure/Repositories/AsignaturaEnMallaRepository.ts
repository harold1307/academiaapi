import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsignaturaEnMalla } from "../../Domain/IAsignaturaEnMalla";
import type {
	IAsignaturaEnMallaRepository,
	UpdateAsignaturaEnMallaParams,
} from "../../Domain/IAsignaturaEnMallaRepository";
import type { ICreateAsignaturaEnMalla } from "../../Domain/ICreateAsignaturaEnMalla";

@injectable()
export class AsignaturaEnMallaRepository
	implements IAsignaturaEnMallaRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getById(id: string): Promise<IAsignaturaEnMalla | null> {
		const asignatura = await this._client.asignaturaEnMalla.findUnique({
			where: { id },
			include: {
				ejeFormativo: true,
				areaConocimiento: true,
				campoFormacion: true,
			},
		});

		if (!asignatura) return null;

		const { areaConocimiento, ejeFormativo, campoFormacion, ...rest } =
			asignatura;

		return {
			...rest,
			areaConocimiento: areaConocimiento
				? {
						...areaConocimiento,
						enUso: true,
					}
				: null,
			ejeFormativo: ejeFormativo ? { ...ejeFormativo, enUso: true } : null,
			campoFormacion: campoFormacion
				? { ...campoFormacion, enUso: true }
				: null,
		};
	}

	async create({
		mallaId,
		asignaturaId,
		ejeFormativoId,
		campoFormacionId,
		areaConocimientoId,
		...data
	}: ICreateAsignaturaEnMalla): Promise<IAsignaturaEnMalla> {
		const asignatura = await this._client.asignaturaEnMalla.create({
			data: {
				...data,
				malla: { connect: { id: mallaId } },
				asignatura: { connect: { id: asignaturaId } },
				areaConocimiento: { connect: { id: areaConocimientoId } },
				...(ejeFormativoId
					? { ejeFormativo: { connect: { id: ejeFormativoId } } }
					: {}),
				...(campoFormacionId
					? { campoFormacion: { connect: { id: campoFormacionId } } }
					: {}),
			},
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

	async update({
		id,
		data: { ejeFormativoId, campoFormacionId, areaConocimientoId, ...data },
	}: UpdateAsignaturaEnMallaParams): Promise<IAsignaturaEnMalla> {
		const asignatura = await this._client.asignaturaEnMalla.update({
			where: { id },
			data: {
				...data,
				...(ejeFormativoId
					? { ejeFormativo: { connect: { id: ejeFormativoId } } }
					: {}),
				...(campoFormacionId
					? { campoFormacion: { connect: { id: campoFormacionId } } }
					: {}),
				...(areaConocimientoId
					? { areaConocimiento: { connect: { id: areaConocimientoId } } }
					: {}),
			},
			include: {
				ejeFormativo: true,
				areaConocimiento: true,
				campoFormacion: true,
			},
		});

		const { areaConocimiento, ejeFormativo, campoFormacion, ...rest } =
			asignatura;

		return {
			...rest,
			areaConocimiento: areaConocimiento
				? {
						...areaConocimiento,
						enUso: true,
					}
				: null,
			ejeFormativo: ejeFormativo ? { ...ejeFormativo, enUso: true } : null,
			campoFormacion: campoFormacion
				? { ...campoFormacion, enUso: true }
				: null,
		};
	}

	async deleteById(id: string): Promise<IAsignaturaEnMalla> {
		const asignatura = await this._client.asignaturaEnMalla.delete({
			where: { id },
			include: {
				ejeFormativo: true,
				areaConocimiento: true,
				campoFormacion: true,
			},
		});

		const { areaConocimiento, ejeFormativo, campoFormacion, ...rest } =
			asignatura;

		return {
			...rest,
			areaConocimiento: areaConocimiento
				? {
						...areaConocimiento,
						enUso: true,
					}
				: null,
			ejeFormativo: ejeFormativo ? { ...ejeFormativo, enUso: true } : null,
			campoFormacion: campoFormacion
				? { ...campoFormacion, enUso: true }
				: null,
		};
	}

	async getAll(): Promise<IAsignaturaEnMalla[]> {
		const asignaturas = await this._client.asignaturaEnMalla.findMany({
			include: {
				ejeFormativo: true,
				areaConocimiento: true,
				campoFormacion: true,
			},
		});

		return asignaturas.map(
			({ areaConocimiento, ejeFormativo, campoFormacion, ...rest }) => ({
				...rest,
				areaConocimiento: areaConocimiento
					? {
							...areaConocimiento,
							enUso: true,
						}
					: null,
				ejeFormativo: ejeFormativo ? { ...ejeFormativo, enUso: true } : null,
				campoFormacion: campoFormacion
					? { ...campoFormacion, enUso: true }
					: null,
			}),
		);
	}
}
