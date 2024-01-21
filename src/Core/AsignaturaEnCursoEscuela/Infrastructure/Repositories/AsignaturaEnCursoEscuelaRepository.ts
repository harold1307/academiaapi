import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsignaturaEnCursoEscuela } from "../../Domain/IAsignaturaEnCursoEscuela";
import type {
	IAsignaturaEnCursoEscuelaRepository,
	IUpdateAsignaturaEnCursoEscuelaParams,
} from "../../Domain/IAsignaturaEnCursoEscuelaRepository";
import type { ICreateAsignaturaEnCursoEscuela } from "../../Domain/ICreateAsignaturaEnCursoEscuela";

@injectable()
export class AsignaturaEnCursoEscuelaRepository
	implements IAsignaturaEnCursoEscuelaRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<IAsignaturaEnCursoEscuela[]> {
		return this._client.asignaturaEnCursoEscuela.findMany();
	}
	getById(id: string): Promise<IAsignaturaEnCursoEscuela | null> {
		return this._client.asignaturaEnCursoEscuela.findFirst({
			where: {
				id,
			},
		});
	}
	deleteById(id: string): Promise<IAsignaturaEnCursoEscuela> {
		return this._client.asignaturaEnCursoEscuela.delete({ where: { id } });
	}

	create({
		profesorId,
		asignaturaId,
		cursoEscuelaId,
		...data
	}: ICreateAsignaturaEnCursoEscuela): Promise<IAsignaturaEnCursoEscuela> {
		return this._client.asignaturaEnCursoEscuela.create({
			data: {
				...data,
				asignatura: { connect: { id: asignaturaId } },
				cursoEscuela: { connect: { id: cursoEscuelaId } },
				...(profesorId ? { profesor: { connect: { id: profesorId } } } : {}),
			},
		});
	}
	update({
		id,
		data: { profesorId, asignaturaId, ...data },
	}: IUpdateAsignaturaEnCursoEscuelaParams): Promise<IAsignaturaEnCursoEscuela> {
		return this._client.asignaturaEnCursoEscuela.update({
			where: { id },
			data: {
				...data,
				...(profesorId ? { profesor: { connect: { id: profesorId } } } : {}),
				...(asignaturaId
					? { asignatura: { connect: { id: asignaturaId } } }
					: {}),
			},
		});
	}
}
