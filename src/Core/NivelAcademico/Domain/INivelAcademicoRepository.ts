import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

// import type { ICreateNivelAcademico } from "./ICreateNivelAcademico";
import type { INivelAcademico } from "./INivelAcademico";
import type { IUpdateNivelAcademico } from "./IUpdateNivelAcademico";
import type { INivelAcademicoQueryFilter } from "./INivelAcademicoQueryFilter";

export type UpdateNivelAcademicoParams = {
	id: string;
	data: IUpdateNivelAcademico;
};

export type GetAllNivelesAcademicosParams = {
	filters?: INivelAcademicoQueryFilter;
};

export type INivelAcademicoRepository = {
	// create(data: ICreateNivelAcademico): Promise<INivelAcademico>;
	getAll(params?: GetAllNivelesAcademicosParams): Promise<INivelAcademico[]>;
	getById(id: string): Promise<INivelAcademico | null>;
	update(params: UpdateNivelAcademicoParams): Promise<INivelAcademico>;
	deleteById(id: string): Promise<INivelAcademico>;

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
		) => Promise<INivelAcademico>,
	): Promise<INivelAcademico>;
};
