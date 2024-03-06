import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateResponsableEnAsesorEstudiante } from "../../Domain/ICreateResponsableEnAsesorEstudiante";
import type { IResponsableEnAsesorEstudiante } from "../../Domain/IResponsableEnAsesorEstudiante";
import type { IResponsableEnAsesorEstudianteRepository } from "../../Domain/IResponsableEnAsesorEstudianteRepository";

@injectable()
export class ResponsableEnAsesorEstudianteRepository
	implements IResponsableEnAsesorEstudianteRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	// getAll(): Promise<IResponsableEnAsesorEstudiante[]> {

	// }
	getById(id: string): Promise<IResponsableEnAsesorEstudiante | null> {
		return this._client.responsableEnAsesorEstudiante.findUnique({
			where: {
				id,
			},
		});
	}
	deleteById(id: string): Promise<IResponsableEnAsesorEstudiante> {
		return this._client.responsableEnAsesorEstudiante.delete({
			where: { id },
		});
	}

	create({
		responsableId,
		asesorEstudianteId,
	}: ICreateResponsableEnAsesorEstudiante): Promise<IResponsableEnAsesorEstudiante> {
		return this._client.responsableEnAsesorEstudiante.create({
			data: {
				asesorEstudiante: { connect: { id: asesorEstudianteId } },
				responsable: { connect: { id: responsableId } },
			},
		});
	}

	// update(
	// 	params: UpdateResponsableEnAsesorEstudianteParams,
	// ): Promise<IResponsableEnAsesorEstudiante> {}
}
