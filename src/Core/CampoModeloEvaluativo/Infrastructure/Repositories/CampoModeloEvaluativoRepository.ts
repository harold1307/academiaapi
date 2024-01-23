import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICampoModeloEvaluativo } from "../../Domain/ICampoModeloEvaluativo";
import type {
	ICampoModeloEvaluativoRepository,
	IUpdateCampoModeloEvaluativoParams,
} from "../../Domain/ICampoModeloEvaluativoRepository";
import type { ICreateCampoModeloEvaluativo } from "../../Domain/ICreateCampoModeloEvaluativo";

@injectable()
export class CampoModeloEvaluativoRepository
	implements ICampoModeloEvaluativoRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<ICampoModeloEvaluativo[]> {
		return this._client.campoModeloEvaluativo.findMany();
	}
	getById(id: string): Promise<ICampoModeloEvaluativo | null> {
		return this._client.campoModeloEvaluativo.findUnique({ where: { id } });
	}
	deleteById(id: string): Promise<ICampoModeloEvaluativo> {
		return this._client.campoModeloEvaluativo.delete({ where: { id } });
	}

	create({
		alternativaId,
		modeloEvaluativoId,
		...data
	}: ICreateCampoModeloEvaluativo): Promise<ICampoModeloEvaluativo> {
		return this._client.campoModeloEvaluativo.create({
			data: {
				...data,
				modeloEvaluativo: {
					connect: {
						id: modeloEvaluativoId,
					},
				},
				alternativa: {
					connect: {
						id: alternativaId,
					},
				},
			},
		});
	}
	update({
		id,
		data: { alternativaId, ...data },
	}: IUpdateCampoModeloEvaluativoParams): Promise<ICampoModeloEvaluativo> {
		return this._client.campoModeloEvaluativo.update({
			where: { id },
			data: {
				...data,
				...(alternativaId
					? { alternativa: { connect: { id: alternativaId } } }
					: {}),
			},
		});
	}
}
