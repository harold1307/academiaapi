import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateResponsableAsesorEstudiante } from "../../Domain/ICreateResponsableAsesorEstudiante";
import type { IResponsableAsesorEstudiante } from "../../Domain/IResponsableAsesorEstudiante";
import type { IResponsableAsesorEstudianteRepository } from "../../Domain/IResponsableAsesorEstudianteRepository";

@injectable()
export class ResponsableAsesorEstudianteRepository
	implements IResponsableAsesorEstudianteRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IResponsableAsesorEstudiante[]> {
		const responsables =
			await this._client.responsableAsesorEstudiante.findMany({
				include: {
					administrativo: {
						include: {
							usuario: true,
						},
					},
					_count: {
						select: {
							asesores: true,
						},
					},
				},
			});

		return responsables.map(({ _count, ...r }) => ({
			...r,
			asesoresCount: _count.asesores,
		}));
	}
	async getById(id: string): Promise<IResponsableAsesorEstudiante | null> {
		const responsable =
			await this._client.responsableAsesorEstudiante.findUnique({
				where: {
					id,
				},
				include: {
					administrativo: {
						include: {
							usuario: true,
						},
					},
					_count: {
						select: {
							asesores: true,
						},
					},
				},
			});

		if (!responsable) return null;

		const { _count, ...r } = responsable;

		return {
			...r,
			asesoresCount: _count.asesores,
		};
	}

	async deleteById(id: string): Promise<IResponsableAsesorEstudiante> {
		const responsable = await this._client.responsableAsesorEstudiante.delete({
			where: {
				id,
			},
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
				_count: {
					select: {
						asesores: true,
					},
				},
			},
		});

		const { _count, ...r } = responsable;

		return {
			...r,
			asesoresCount: _count.asesores,
		};
	}

	async create({
		administrativoId,
		...data
	}: ICreateResponsableAsesorEstudiante): Promise<IResponsableAsesorEstudiante> {
		const responsable = await this._client.responsableAsesorEstudiante.create({
			data: {
				...data,
				administrativo: {
					connect: {
						id: administrativoId,
					},
				},
			},
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
				_count: {
					select: {
						asesores: true,
					},
				},
			},
		});

		const { _count, ...r } = responsable;

		return {
			...r,
			asesoresCount: _count.asesores,
		};
	}
	// update(
	// 	params: UpdateResponsableAsesorEstudianteParams,
	// ): Promise<IResponsableAsesorEstudiante> {}
}
