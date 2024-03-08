import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateProgramaEnVarianteCurso } from "../../Domain/ICreateProgramaEnVarianteCurso";
import type { IProgramaEnVarianteCurso } from "../../Domain/IProgramaEnVarianteCurso";
import type {
	IProgramaEnVarianteCursoRepository,
	UpdateProgramaEnVarianteCursoParams,
} from "../../Domain/IProgramaEnVarianteCursoRepository";

@injectable()
export class ProgramaEnVarianteCursoRepository
	implements IProgramaEnVarianteCursoRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	// getAll(): Promise<IProgramaEnVarianteCurso[]> {

	// }
	getById(id: string): Promise<IProgramaEnVarianteCurso | null> {
		return this._client.programaEnVarianteCurso.findUnique({
			where: { id },
		});
	}
	deleteById(id: string): Promise<IProgramaEnVarianteCurso> {
		return this._client.programaEnVarianteCurso.delete({
			where: { id },
		});
	}

	create({
		mallaId,
		programaId,
		modalidadId,
		varianteCursoId,
		...data
	}: ICreateProgramaEnVarianteCurso): Promise<IProgramaEnVarianteCurso> {
		return this._client.programaEnVarianteCurso.create({
			data: {
				malla: mallaId ? { connect: { id: mallaId } } : undefined,
				programa: { connect: { id: programaId } },
				modalidad: modalidadId ? { connect: { id: modalidadId } } : undefined,
				varianteCurso: { connect: { id: varianteCursoId } },
				...data,
			},
		});
	}
	update({
		id,
		data: { mallaId, modalidadId, programaId, ...data },
	}: UpdateProgramaEnVarianteCursoParams): Promise<IProgramaEnVarianteCurso> {
		return this._client.programaEnVarianteCurso.update({
			where: { id },
			data: {
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
				...data,
			},
		});
	}
}
