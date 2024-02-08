import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IMateriaEnNivelAcademico } from "../../Domain/IMateriaEnNivelAcademico";
import type {
	IMateriaEnNivelAcademicoRepository,
	UpdateMateriaEnNivelAcademicoParams,
} from "../../Domain/IMateriaEnNivelAcademicoRepository";
// import type { ICreateMateriaEnNivelAcademico } from "../../Domain/ICreateMateriaEnNivelAcademico";

@injectable()
export class MateriaEnNivelAcademicoRepository
	implements IMateriaEnNivelAcademicoRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<IMateriaEnNivelAcademico[]> {
		return this._client.materiaEnNivelAcademico.findMany();
	}
	getById(id: string): Promise<IMateriaEnNivelAcademico | null> {
		return this._client.materiaEnNivelAcademico.findFirst({
			where: {
				id,
			},
		});
	}
	deleteById(id: string): Promise<IMateriaEnNivelAcademico> {
		return this._client.materiaEnNivelAcademico.delete({
			where: {
				id,
			},
		});
	}

	// create({
	// 	modeloEvaluativoId,
	// 	...data
	// }: ICreateMateriaEnNivelAcademico): Promise<IMateriaEnNivelAcademico> {
	// 	return this._client.materiaEnNivelAcademico.create({
	// 		data: {
	// 			...data,
	// 			modeloEvaluativo: {
	// 				connect: {
	// 					id: modeloEvaluativoId,
	// 				},
	// 			},

	// 		},
	// 	});
	// }

	transaction(
		tx: (
			prisma: Omit<
				PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
				| "$transaction"
				| "$connect"
				| "$disconnect"
				| "$on"
				| "$use"
				| "$extends"
			>,
		) => Promise<number>,
	): Promise<number> {
		return this._client.$transaction(tx);
	}

	update({
		id,
		data,
	}: UpdateMateriaEnNivelAcademicoParams): Promise<IMateriaEnNivelAcademico> {
		return this._client.materiaEnNivelAcademico.update({
			where: { id },
			data,
		});
	}
}
