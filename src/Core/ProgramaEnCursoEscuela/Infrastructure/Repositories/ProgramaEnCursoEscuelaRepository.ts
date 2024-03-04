import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateProgramaEnCursoEscuela } from "../../Domain/ICreateProgramaEnCursoEscuela";
import type { IProgramaEnCursoEscuela } from "../../Domain/IProgramaEnCursoEscuela";
import type {
	IProgramaEnCursoEscuelaRepository,
	UpdateProgramaEnCursoEscuelaParams,
} from "../../Domain/IProgramaEnCursoEscuelaRepository";

@injectable()
export class ProgramaEnCursoEscuelaRepository
	implements IProgramaEnCursoEscuelaRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	// getAll(): Promise<IProgramaEnCursoEscuela[]> {

	// }
	getById(id: string): Promise<IProgramaEnCursoEscuela | null> {
		return this._client.programaEnCursoEscuela.findUnique({ where: { id } });
	}
	deleteById(id: string): Promise<IProgramaEnCursoEscuela> {
		return this._client.programaEnCursoEscuela.delete({ where: { id } });
	}

	create({
		mallaId,
		programaId,
		modalidadId,
		cursoEscuelaId,
		...data
	}: ICreateProgramaEnCursoEscuela): Promise<IProgramaEnCursoEscuela> {
		return this._client.programaEnCursoEscuela.create({
			data: {
				...data,
				malla: mallaId ? { connect: { id: mallaId } } : undefined,
				modalidad: modalidadId ? { connect: { id: modalidadId } } : undefined,
				programa: { connect: { id: programaId } },
				cursoEscuela: { connect: { id: cursoEscuelaId } },
			},
		});
	}
	update({
		id,
		data: { mallaId, programaId, modalidadId, ...data },
	}: UpdateProgramaEnCursoEscuelaParams): Promise<IProgramaEnCursoEscuela> {
		return this._client.programaEnCursoEscuela.update({
			where: { id },
			data: {
				...data,
				malla:
					mallaId !== undefined
						? mallaId
							? { connect: { id: mallaId } }
							: { disconnect: true }
						: undefined,
				modalidad:
					modalidadId !== undefined
						? modalidadId
							? { connect: { id: modalidadId } }
							: { disconnect: true }
						: undefined,
				programa: programaId ? { connect: { id: programaId } } : undefined,
			},
		});
	}
}
