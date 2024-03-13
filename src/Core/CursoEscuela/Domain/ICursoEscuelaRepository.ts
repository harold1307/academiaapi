import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

import type { ICreateCursoEscuela } from "./ICreateCursoEscuela";
import type { ICursoEscuela } from "./ICursoEscuela";
import type { ICursoEscuelaQueryFilter } from "./ICursoEscuelaQueryFilter";
import type { ICursoEscuelaWithProgramas } from "./ICursoEscuelaWithProgramas";
import type { IUpdateCursoEscuela } from "./IUpdateCursoEscuela";

export type UpdateCursoEscuelaParams = {
	id: string;
	data: IUpdateCursoEscuela;
};

export type GetAllCursoEscuelasParams = {
	filters?: ICursoEscuelaQueryFilter;
};

export type ICursoEscuelaRepository = {
	create(data: ICreateCursoEscuela): Promise<ICursoEscuela>;
	getAll(params?: GetAllCursoEscuelasParams): Promise<ICursoEscuela[]>;
	getById(id: string): Promise<ICursoEscuela | null>;
	update(params: UpdateCursoEscuelaParams): Promise<ICursoEscuela>;
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
	withProgramasGetById(id: string): Promise<ICursoEscuelaWithProgramas | null>;
};
