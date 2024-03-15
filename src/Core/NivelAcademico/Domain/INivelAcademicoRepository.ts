import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

// import type { ICreateNivelAcademico } from "./ICreateNivelAcademico";
import type { INivelAcademico } from "./INivelAcademico";
import type { INivelAcademicoQueryFilter } from "./INivelAcademicoQueryFilter";
import type { INivelAcademicoWithMaterias } from "./INivelAcademicoWithMaterias";
import type { IUpdateNivelAcademico } from "./IUpdateNivelAcademico";

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
	getByIdWithMaterias(id: string): Promise<INivelAcademicoWithMaterias | null>;
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
