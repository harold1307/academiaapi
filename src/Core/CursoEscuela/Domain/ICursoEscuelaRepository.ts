import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

import type { ICreateCursoEscuela } from "./ICreateCursoEscuela";
import type { ICursoEscuela } from "./ICursoEscuela";

export type ICursoEscuelaRepository = {
	create(data: ICreateCursoEscuela): Promise<ICursoEscuela>;
	getAll(): Promise<ICursoEscuela[]>;
	getById(id: string): Promise<ICursoEscuela | null>;
	// update(params: IUpdateCursoEscuelaParams): Promise<ICursoEscuela>;
	deleteById(id: string): Promise<ICursoEscuela>;

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
		) => Promise<ICursoEscuela>,
	): Promise<ICursoEscuela>;
};
