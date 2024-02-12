import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreatePracticaPreProfesionalEnMalla } from "../../Domain/ICreatePracticaPreProfesionalEnMalla";
import type { IPracticaPreProfesionalEnMalla } from "../../Domain/IPracticaPreProfesionalEnMalla";
import type {
	IPracticaPreProfesionalEnMallaRepository,
	UpdatePracticaPreProfesionalEnMallaParams,
} from "../../Domain/IPracticaPreProfesionalEnMallaRepository";

@injectable()
export class PracticaPreProfesionalEnMallaRepository
	implements IPracticaPreProfesionalEnMallaRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	// getAll(): Promise<IPracticaPreProfesionalEnMalla[]> {

	// }
	getById(id: string): Promise<IPracticaPreProfesionalEnMalla | null> {
		return this._client.practicaPreProfesionalEnMalla.findUnique({
			where: { id },
		});
	}
	deleteById(id: string): Promise<IPracticaPreProfesionalEnMalla> {
		return this._client.practicaPreProfesionalEnMalla.delete({
			where: { id },
		});
	}

	create({
		mallaCurricularId,
		registroDesdeNivel,
		...data
	}: ICreatePracticaPreProfesionalEnMalla): Promise<IPracticaPreProfesionalEnMalla> {
		return this._client.practicaPreProfesionalEnMalla.create({
			data: {
				...data,
				mallaCurricular: { connect: { id: mallaCurricularId } },
				registroDesdeNivel: registroDesdeNivel
					? {
							connect: {
								nivel_mallaId: {
									mallaId: mallaCurricularId,
									nivel: registroDesdeNivel,
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
	}: UpdatePracticaPreProfesionalEnMallaParams): Promise<IPracticaPreProfesionalEnMalla> {
		return this._client.practicaPreProfesionalEnMalla.update({
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