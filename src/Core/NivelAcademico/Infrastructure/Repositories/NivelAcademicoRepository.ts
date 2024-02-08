import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateNivelAcademico } from "../../Domain/ICreateNivelAcademico";
import type { INivelAcademico } from "../../Domain/INivelAcademico";
import type {
	INivelAcademicoRepository,
	UpdateNivelAcademicoParams,
} from "../../Domain/INivelAcademicoRepository";

@injectable()
export class NivelAcademicoRepository implements INivelAcademicoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<INivelAcademico[]> {
		return this._client.nivelAcademico.findMany();
	}

	getById(id: string): Promise<INivelAcademico | null> {
		return this._client.nivelAcademico.findUnique({
			where: { id },
		});
	}

	deleteById(id: string): Promise<INivelAcademico> {
		return this._client.nivelAcademico.delete({ where: { id } });
	}

	create({
		sesionId,
		paraleloId,
		nivelMallaId,
		modeloEvaluativoId,
		...data
	}: ICreateNivelAcademico): Promise<INivelAcademico> {
		return this._client.nivelAcademico.create({
			data: {
				...data,
				sesion: { connect: { id: sesionId } },
				paralelo: { connect: { nombre: paraleloId } },
				nivelMalla: { connect: { id: nivelMallaId } },
				modeloEvaluativo: { connect: { id: modeloEvaluativoId } },
			},
		});
	}

	update({
		id,
		data: { paraleloId, modeloEvaluativoId, ...data },
	}: UpdateNivelAcademicoParams): Promise<INivelAcademico> {
		return this._client.nivelAcademico.update({
			where: { id },
			data: {
				...data,
				paralelo: paraleloId ? { connect: { nombre: paraleloId } } : undefined,
				modeloEvaluativo: modeloEvaluativoId
					? { connect: { id: modeloEvaluativoId } }
					: undefined,
			},
		});
	}
}
