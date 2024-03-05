import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateResponsableCrm } from "../../Domain/ICreateResponsableCrm";
import type { IResponsableCrm } from "../../Domain/IResponsableCrm";
import type {
	IResponsableCrmRepository,
	UpdateResponsableCrmParams,
} from "../../Domain/IResponsableCrmRepository";

@injectable()
export class ResponsableCrmRepository implements IResponsableCrmRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<IResponsableCrm[]> {
		return this._client.responsableCrm.findMany({
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
			},
		});
	}
	getById(id: string): Promise<IResponsableCrm | null> {
		return this._client.responsableCrm.findUnique({
			where: { id },
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
			},
		});
	}
	deleteById(id: string): Promise<IResponsableCrm> {
		return this._client.responsableCrm.delete({
			where: { id },
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
			},
		});
	}

	create({
		administrativoId,
	}: ICreateResponsableCrm): Promise<IResponsableCrm> {
		return this._client.responsableCrm.create({
			data: {
				administrativo: {
					connect: {
						id: administrativoId,
					},
				},
			},
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
			},
		});
	}
	update({ id, data }: UpdateResponsableCrmParams): Promise<IResponsableCrm> {
		return this._client.responsableCrm.update({
			where: { id },
			data,
			include: {
				administrativo: {
					include: {
						usuario: true,
					},
				},
			},
		});
	}
}
