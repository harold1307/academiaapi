import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsesorCrmEnCentroInformacionRepository } from "../../Domain/IAsesorCrmEnCentroInformacionRepository";

@injectable()
export class AsesorCrmEnCentroInformacionRepository
	implements IAsesorCrmEnCentroInformacionRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	// getAll(): Promise<IAsesorCrmEnCentroInformacion[]> {

	// }
	// getById(id: string): Promise<IAsesorCrmEnCentroInformacion | null>{

	// }
	// deleteById(id: string): Promise<IAsesorCrmEnCentroInformacion>{

	// }

	// create(data: ICreateAsesorCrmEnCentroInformacion): Promise<IAsesorCrmEnCentroInformacion> {

	// }
	// update(params: UpdateAsesorCrmEnCentroInformacionParams): Promise<IAsesorCrmEnCentroInformacion> {

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
}
