import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsesorCrm } from "../../Domain/IAsesorCrm";
import type { IAsesorCrmRepository } from "../../Domain/IAsesorCrmRepository";
import type { ICreateAsesorCrm } from "../../Domain/ICreateAsesorCrm";

@injectable()
export class AsesorCrmRepository implements IAsesorCrmRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<IAsesorCrm[]> {
		return this._client.asesorCrm.findMany({
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
				centrosInformacion: {
					include: {
						centroInformacion: true,
					},
				},
			},
		});
	}
	getById(id: string): Promise<IAsesorCrm | null> {
		return this._client.asesorCrm.findUnique({
			where: { id },
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
				centrosInformacion: {
					include: {
						centroInformacion: true,
					},
				},
			},
		});
	}
	deleteById(id: string): Promise<IAsesorCrm> {
		return this._client.asesorCrm.delete({
			where: { id },
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
				centrosInformacion: {
					include: {
						centroInformacion: true,
					},
				},
			},
		});
	}

	create({ administrativoId }: ICreateAsesorCrm): Promise<IAsesorCrm> {
		return this._client.asesorCrm.create({
			data: {
				administrativo: {
					connect: { id: administrativoId },
				},
			},
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
				centrosInformacion: {
					include: {
						centroInformacion: true,
					},
				},
			},
		});
	}
	// update({ id, data }: UpdateAsesorCrmParams): Promise<IAsesorCrm> {}
}
