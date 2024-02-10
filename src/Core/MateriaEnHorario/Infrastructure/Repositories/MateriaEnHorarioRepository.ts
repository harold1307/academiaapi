import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateMateriaEnHorario } from "../../Domain/ICreateMateriaEnHorario";
import type { IMateriaEnHorario } from "../../Domain/IMateriaEnHorario";
import type {
	IMateriaEnHorarioRepository,
	UpdateMateriaEnHorarioParams,
} from "../../Domain/IMateriaEnHorarioRepository";

@injectable()
export class MateriaEnHorarioRepository implements IMateriaEnHorarioRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IMateriaEnHorario[]> {
		const materias = await this._client.materiaEnHorario.findMany({
			include: {
				ubicacion: true,
				turno: {
					include: {
						sesion: true,
					},
				},
				nivelAcademico: {
					include: {
						sesion: true,
					},
				},
			},
		});

		return materias.map(
			({
				turno: { sesion, ...turno },
				nivelAcademico: { sesion: sesionT, ...nivelAcademico },
				ubicacion,
				...rest
			}) => ({
				...rest,
				ubicacion: {
					...ubicacion,
					enUso: true,
				},
				turno: {
					...turno,
					sesion: {
						...sesion,
						enUso: true,
					},
					enUso: true,
				},
				nivelAcademico: {
					...nivelAcademico,
					sesion: {
						...sesionT,
						enUso: true,
					},
				},
			}),
		);
	}
	async getById(id: string): Promise<IMateriaEnHorario | null> {
		const materia = await this._client.materiaEnHorario.findUnique({
			where: { id },
			include: {
				ubicacion: true,
				turno: {
					include: {
						sesion: true,
					},
				},
				nivelAcademico: {
					include: {
						sesion: true,
					},
				},
			},
		});

		if (!materia) return null;

		const {
			turno: { sesion, ...turno },
			nivelAcademico: { sesion: sesionT, ...nivelAcademico },
			ubicacion,
			...rest
		} = materia;

		return {
			...rest,
			ubicacion: {
				...ubicacion,
				enUso: true,
			},
			turno: {
				...turno,
				sesion: {
					...sesion,
					enUso: true,
				},
				enUso: true,
			},
			nivelAcademico: {
				...nivelAcademico,
				sesion: {
					...sesionT,
					enUso: true,
				},
			},
		};
	}
	async deleteById(id: string): Promise<IMateriaEnHorario> {
		const materia = await this._client.materiaEnHorario.delete({
			where: { id },
			include: {
				ubicacion: true,
				turno: {
					include: {
						sesion: true,
					},
				},
				nivelAcademico: {
					include: {
						sesion: true,
					},
				},
			},
		});

		const {
			turno: { sesion, ...turno },
			nivelAcademico: { sesion: sesionT, ...nivelAcademico },
			ubicacion,
			...rest
		} = materia;

		return {
			...rest,
			ubicacion: {
				...ubicacion,
				enUso: true,
			},
			turno: {
				...turno,
				sesion: {
					...sesion,
					enUso: true,
				},
				enUso: true,
			},
			nivelAcademico: {
				...nivelAcademico,
				sesion: {
					...sesionT,
					enUso: true,
				},
			},
		};
	}

	async create({
		turnoId,
		materiaId,
		nivelAcademicoId,
		ubicacionId,
		...data
	}: ICreateMateriaEnHorario): Promise<IMateriaEnHorario> {
		const materia = await this._client.materiaEnHorario.create({
			data: {
				...data,
				materia: { connect: { id: materiaId } },
				nivelAcademico: { connect: { id: nivelAcademicoId } },
				turno: { connect: { id: turnoId } },
				ubicacion: { connect: { id: ubicacionId } },
			},
			include: {
				ubicacion: true,
				turno: {
					include: {
						sesion: true,
					},
				},
				nivelAcademico: {
					include: {
						sesion: true,
					},
				},
			},
		});

		const {
			turno: { sesion, ...turno },
			nivelAcademico: { sesion: sesionT, ...nivelAcademico },
			ubicacion,
			...rest
		} = materia;

		return {
			...rest,
			ubicacion: {
				...ubicacion,
				enUso: true,
			},
			turno: {
				...turno,
				sesion: {
					...sesion,
					enUso: true,
				},
				enUso: true,
			},
			nivelAcademico: {
				...nivelAcademico,
				sesion: {
					...sesionT,
					enUso: true,
				},
			},
		};
	}
	async update({
		id,
		data: { turnoId, ubicacionId, ...data },
	}: UpdateMateriaEnHorarioParams): Promise<IMateriaEnHorario> {
		const materia = await this._client.materiaEnHorario.update({
			where: { id },
			data: {
				...data,
				turno: turnoId ? { connect: { id: turnoId } } : undefined,
				ubicacion: ubicacionId ? { connect: { id: ubicacionId } } : undefined,
			},
			include: {
				ubicacion: true,
				turno: {
					include: {
						sesion: true,
					},
				},
				nivelAcademico: {
					include: {
						sesion: true,
					},
				},
			},
		});

		const {
			turno: { sesion, ...turno },
			nivelAcademico: { sesion: sesionT, ...nivelAcademico },
			ubicacion,
			...rest
		} = materia;

		return {
			...rest,
			ubicacion: {
				...ubicacion,
				enUso: true,
			},
			turno: {
				...turno,
				sesion: {
					...sesion,
					enUso: true,
				},
				enUso: true,
			},
			nivelAcademico: {
				...nivelAcademico,
				sesion: {
					...sesionT,
					enUso: true,
				},
			},
		};
	}
}
