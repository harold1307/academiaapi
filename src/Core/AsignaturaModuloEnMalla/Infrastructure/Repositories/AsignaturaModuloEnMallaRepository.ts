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

	async getAll(): Promise<IAsignaturaModuloEnMalla[]> {
		const modulos = await this._client.asignaturaModuloEnMalla.findMany({
			include: {
				campoFormacion: true,
				areaConocimiento: true,
				asignatura: true,
			},
		});

		return modulos.map(
			({ campoFormacion, areaConocimiento, asignatura, ...rest }) => ({
				...rest,
				campoFormacion: {
					...campoFormacion,
					enUso: true,
				},
				areaConocimiento: {
					...areaConocimiento,
					enUso: true,
				},
				asignatura: {
					...asignatura,
					enUso: true,
				},
			}),
		);
	}
	async getById(id: string): Promise<IAsignaturaModuloEnMalla | null> {
		const modulo = await this._client.asignaturaModuloEnMalla.findFirst({
			where: { id },
			include: {
				campoFormacion: true,
				areaConocimiento: true,
				asignatura: true,
			},
		});

		if (!modulo) return null;

		const { campoFormacion, areaConocimiento, asignatura, ...rest } = modulo;

		return {
			...rest,
			campoFormacion: {
				...campoFormacion,
				enUso: true,
			},
			areaConocimiento: {
				...areaConocimiento,
				enUso: true,
			},
			asignatura: {
				...asignatura,
				enUso: true,
			},
		};
	}
	async deleteById(id: string): Promise<IAsignaturaModuloEnMalla> {
		const modulo = await this._client.asignaturaModuloEnMalla.delete({
			where: { id },
			include: {
				campoFormacion: true,
				areaConocimiento: true,
				asignatura: true,
			},
		});

		const { campoFormacion, areaConocimiento, asignatura, ...rest } = modulo;

		return {
			...rest,
			campoFormacion: {
				...campoFormacion,
				enUso: true,
			},
			areaConocimiento: {
				...areaConocimiento,
				enUso: true,
			},
			asignatura: {
				...asignatura,
				enUso: true,
			},
		};
	}

	async create({
		mallaId,
		asignaturaId,
		campoFormacionId,
		areaConocimientoId,
		...data
	}: ICreateAsignaturaModuloEnMalla): Promise<IAsignaturaModuloEnMalla> {
		const modulo = await this._client.asignaturaModuloEnMalla.create({
			data: {
				...data,
				malla: { connect: { id: mallaId } },
				asignatura: { connect: { id: asignaturaId } },
				campoFormacion: { connect: { id: campoFormacionId } },
				areaConocimiento: { connect: { id: areaConocimientoId } },
			},
			include: {
				campoFormacion: true,
				areaConocimiento: true,
				asignatura: true,
			},
		});

		const { campoFormacion, areaConocimiento, asignatura, ...rest } = modulo;

		return {
			...rest,
			campoFormacion: {
				...campoFormacion,
				enUso: true,
			},
			areaConocimiento: {
				...areaConocimiento,
				enUso: true,
			},
			asignatura: {
				...asignatura,
				enUso: true,
			},
		};
	}
	async update({
		id,
		data: { campoFormacionId, areaConocimientoId, ...data },
	}: UpdateAsignaturaModuloEnMallaParams): Promise<IAsignaturaModuloEnMalla> {
		const modulo = await this._client.asignaturaModuloEnMalla.update({
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
			include: {
				campoFormacion: true,
				areaConocimiento: true,
				asignatura: true,
			},
		});

		const { campoFormacion, areaConocimiento, asignatura, ...rest } = modulo;

		return {
			...rest,
			campoFormacion: {
				...campoFormacion,
				enUso: true,
			},
			areaConocimiento: {
				...areaConocimiento,
				enUso: true,
			},
			asignatura: {
				...asignatura,
				enUso: true,
			},
		};
	}
}
