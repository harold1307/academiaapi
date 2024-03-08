import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
// import type { ICreateAsesorCrmEnCentroInformacion } from "./ICreateAsesorCrmEnCentroInformacion";
// import type { IUpdateAsesorCrmEnCentroInformacion } from "./IUpdateAsesorCrmEnCentroInformacion";

// export type UpdateAsesorCrmEnCentroInformacionParams = {
// 	id: string;
// 	data: IUpdateAsesorCrmEnCentroInformacion;
// };

export type IAsesorCrmEnCentroInformacionRepository = {
	// create(
	// 	data: ICreateAsesorCrmEnCentroInformacion,
	// ): Promise<IAsesorCrmEnCentroInformacion>;
	// getAll(): Promise<IAsesorCrmEnCentroInformacion[]>;
	// getById(id: string): Promise<IAsesorCrmEnCentroInformacion | null>;
	// update(
	// 	params: UpdateAsesorCrmEnCentroInformacionParams,
	// ): Promise<IAsesorCrmEnCentroInformacion>;
	// deleteById(id: string): Promise<IAsesorCrmEnCentroInformacion>;
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
