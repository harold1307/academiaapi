import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsesorEstudiante } from "../../Domain/IAsesorEstudiante";
import type {
	IAsesorEstudianteRepository,
	UpdateAsesorEstudianteParams,
} from "../../Domain/IAsesorEstudianteRepository";
import type { ICreateAsesorEstudiante } from "../../Domain/ICreateAsesorEstudiante";

@injectable()
export class AsesorEstudianteRepository implements IAsesorEstudianteRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IAsesorEstudiante[]> {
		const estudiantes = await this._client.asesorEstudiante.findMany({
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
				_count: {
					select: {
						estudiantes: true,
					},
				},
			},
		});

		return estudiantes.map(({ _count, ...e }) => ({
			...e,
			estudiantesCount: _count.estudiantes,
		}));
	}
	async getById(id: string): Promise<IAsesorEstudiante | null> {
		const estudiante = await this._client.asesorEstudiante.findUnique({
			where: { id },
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
				_count: {
					select: {
						estudiantes: true,
					},
				},
			},
		});

		if (!estudiante) return null;

		const { _count, ...e } = estudiante;

		return {
			...e,
			estudiantesCount: _count.estudiantes,
		};
	}

	async deleteById(id: string): Promise<IAsesorEstudiante> {
		const estudiante = await this._client.asesorEstudiante.delete({
			where: { id },
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
				_count: {
					select: {
						estudiantes: true,
					},
				},
			},
		});

		const { _count, ...e } = estudiante;

		return {
			...e,
			estudiantesCount: _count.estudiantes,
		};
	}

	async create({
		administrativoId,
		...data
	}: ICreateAsesorEstudiante): Promise<IAsesorEstudiante> {
		const estudiante = await this._client.asesorEstudiante.create({
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
						estudiantes: true,
					},
				},
			},
		});

		const { _count, ...e } = estudiante;

		return {
			...e,
			estudiantesCount: _count.estudiantes,
		};
	}

	async update({
		id,
		data,
	}: UpdateAsesorEstudianteParams): Promise<IAsesorEstudiante> {
		const estudiante = await this._client.asesorEstudiante.update({
			where: { id },
			data,
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
				_count: {
					select: {
						estudiantes: true,
					},
				},
			},
		});

		const { _count, ...e } = estudiante;

		return {
			...e,
			estudiantesCount: _count.estudiantes,
		};
	}
}
