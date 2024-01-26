import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsignatura } from "../../Domain/IAsignatura";
import type {
	IAsignaturaRepository,
	IUpdateAsignaturaParams,
} from "../../Domain/IAsignaturaRepository";
import type { ICreateAsignatura } from "../../Domain/ICreateAsignatura";

@injectable()
export class AsignaturaRepository implements IAsignaturaRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IAsignatura[]> {
		const asignaturas = await this._client.asignatura.findMany({
			include: {
				asignaturasEnCursoEscuela: {
					take: 1,
				},
				asignaturasEnMalla: {
					take: 1,
				},
				asignaturasEnVarianteCurso: {
					take: 1,
				},
			},
		});

		return asignaturas.map(
			({
				asignaturasEnCursoEscuela,
				asignaturasEnMalla,
				asignaturasEnVarianteCurso,
				...a
			}) => ({
				...a,
				enUso:
					asignaturasEnMalla.length > 0 ||
					asignaturasEnCursoEscuela.length > 0 ||
					asignaturasEnVarianteCurso.length > 0,
			}),
		);
	}

	async getById(id: string): Promise<IAsignatura | null> {
		const asignatura = await this._client.asignatura.findUnique({
			where: { id },
			include: {
				asignaturasEnCursoEscuela: {
					take: 1,
				},
				asignaturasEnMalla: {
					take: 1,
				},
				asignaturasEnVarianteCurso: {
					take: 1,
				},
			},
		});

		if (!asignatura) return null;

		const {
			asignaturasEnCursoEscuela,
			asignaturasEnMalla,
			asignaturasEnVarianteCurso,
			...rest
		} = asignatura;

		return {
			...rest,
			enUso:
				asignaturasEnMalla.length > 0 ||
				asignaturasEnCursoEscuela.length > 0 ||
				asignaturasEnVarianteCurso.length > 0,
		};
	}

	async create(data: ICreateAsignatura): Promise<IAsignatura> {
		const asignatura = await this._client.asignatura.create({
			data,
		});

		return { ...asignatura, enUso: false };
	}

	async update({ data, id }: IUpdateAsignaturaParams): Promise<IAsignatura> {
		const asignatura = await this._client.asignatura.update({
			where: { id: id },
			data,
			include: {
				asignaturasEnCursoEscuela: {
					take: 1,
				},
				asignaturasEnMalla: {
					take: 1,
				},
				asignaturasEnVarianteCurso: {
					take: 1,
				},
			},
		});

		const {
			asignaturasEnCursoEscuela,
			asignaturasEnMalla,
			asignaturasEnVarianteCurso,
			...rest
		} = asignatura;

		return {
			...rest,
			enUso:
				asignaturasEnMalla.length > 0 ||
				asignaturasEnCursoEscuela.length > 0 ||
				asignaturasEnVarianteCurso.length > 0,
		};
	}

	async deleteById(id: string): Promise<IAsignatura> {
		const asignatura = await this._client.asignatura.delete({ where: { id } });

		return {
			...asignatura,
			enUso: false,
		};
	}
}
