import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

import type { IUpdateMallaCurricular } from "../Domain/IUpdateMallaCurricular";
// import type { ICreateMallaCurricular } from "./ICreateMallaCurricular";
import type { IMallaCurricular } from "./IMallaCurricular";

export type UpdateMallaCurricularParams = {
	id: string;
	data: IUpdateMallaCurricular;
};

export interface IMallaCurricularRepository {
	// create(
	// 	data: Omit<ICreateMallaCurricular, "niveles">,
	// ): Promise<IMallaCurricular>;
	getAll(): Promise<IMallaCurricular[]>;
	getById(id: string): Promise<IMallaCurricular | null>;
	update(params: UpdateMallaCurricularParams): Promise<IMallaCurricular>;
	deleteById(id: string): Promise<IMallaCurricular>;

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
		) => Promise<IMallaCurricular>,
	): Promise<IMallaCurricular>;
}
