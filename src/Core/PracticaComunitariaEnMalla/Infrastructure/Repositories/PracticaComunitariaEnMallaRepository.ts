import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreatePracticaComunitariaEnMalla } from "../../Domain/ICreatePracticaComunitariaEnMalla";
import type { IPracticaComunitariaEnMalla } from "../../Domain/IPracticaComunitariaEnMalla";
import type {
	IPracticaComunitariaEnMallaRepository,
	UpdatePracticaComunitariaEnMallaParams,
} from "../../Domain/IPracticaComunitariaEnMallaRepository";

@injectable()
export class PracticaComunitariaEnMallaRepository
	implements IPracticaComunitariaEnMallaRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	// getAll(): Promise<IPracticaComunitariaEnMalla[]> {

	// }
	getById(id: string): Promise<IPracticaComunitariaEnMalla | null> {
		return this._client.practicaComunitariaEnMalla.findUnique({
			where: { id },
		});
	}
	deleteById(id: string): Promise<IPracticaComunitariaEnMalla> {
		return this._client.practicaComunitariaEnMalla.delete({ where: { id } });
	}

	create({
		mallaCurricularId,
		registroDesdeNivel,
		...data
	}: ICreatePracticaComunitariaEnMalla): Promise<IPracticaComunitariaEnMalla> {
		return this._client.practicaComunitariaEnMalla.create({
			data: {
				...data,
				mallaCurricular: { connect: { id: mallaCurricularId } },
				registroDesdeNivel: registroDesdeNivel
					? {
							connect: {
								nivel_mallaId: {
									nivel: registroDesdeNivel,
									mallaId: mallaCurricularId,
								},
							},
						}
					: undefined,
			},
		});
	}

	update({
		id,
		data: { registroDesdeNivel, mallaCurricularId, ...data },
	}: UpdatePracticaComunitariaEnMallaParams): Promise<IPracticaComunitariaEnMalla> {
		return this._client.practicaComunitariaEnMalla.update({
			where: { id },
			data: {
				...data,
				registroDesdeNivel:
					registroDesdeNivel !== undefined
						? registroDesdeNivel
							? {
									connect: {
										nivel_mallaId: {
											nivel: registroDesdeNivel,
											mallaId: mallaCurricularId,
										},
									},
								}
							: { disconnect: true }
						: undefined,
			},
		});
	}
}
