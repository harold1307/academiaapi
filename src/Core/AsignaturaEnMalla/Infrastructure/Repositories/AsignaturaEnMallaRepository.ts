import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsignaturaEnMalla } from "../../Domain/IAsignaturaEnMalla";
import type { IAsignaturaEnMallaRepository } from "../../Domain/IAsignaturaEnMallaRepository";
import type { ICreateAsignaturaEnMalla } from "../../Domain/ICreateAsignaturaEnMalla";

@injectable()
export class AsignaturaEnMallaRepository
	implements IAsignaturaEnMallaRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create(data: ICreateAsignaturaEnMalla): Promise<IAsignaturaEnMalla> {
		return this._client.asignaturaEnMalla.create({
			data,
		});
	}
}
