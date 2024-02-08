import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

import type { IMateriaEnNivelAcademico } from "./IMateriaEnNivelAcademico";
// import type { ICreateMateriaEnNivelAcademico } from "./ICreateMateriaEnNivelAcademico"
import type { IUpdateMateriaEnNivelAcademico } from "./IUpdateMateriaEnNivelAcademico";

export type UpdateMateriaEnNivelAcademicoParams = {
	id: string;
	data: IUpdateMateriaEnNivelAcademico;
};

export type IMateriaEnNivelAcademicoRepository = {
	// create(data: ICreateMateriaEnNivelAcademico): Promise<IMateriaEnNivelAcademico>;
	getAll(): Promise<IMateriaEnNivelAcademico[]>;
	getById(id: string): Promise<IMateriaEnNivelAcademico | null>;
	update(
		params: UpdateMateriaEnNivelAcademicoParams,
	): Promise<IMateriaEnNivelAcademico>;
	deleteById(id: string): Promise<IMateriaEnNivelAcademico>;

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
	): Promise<number>;
};
