import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsesorCrmEnCentroInformacionRepository } from "../Domain/IAsesorCrmEnCentroInformacionRepository";
import type { IAsesorCrmEnCentroInformacionService } from "../Domain/IAsesorCrmEnCentroInformacionService";
import type { ICreateAsesorCrmEnCentroInformacion } from "../Domain/ICreateAsesorCrmEnCentroInformacion";
import type { IUpdateAsesorCrmEnCentroInformacion } from "../Domain/IUpdateAsesorCrmEnCentroInformacion";
import { CreateAsesorCrmEnCentroInformacionDTO } from "../Infrastructure/DTOs/CreateAsesorCrmEnCentroInformacionDTO";
import { UpdateAsesorCrmEnCentroInformacionDTO } from "../Infrastructure/DTOs/UpdateAsesorCrmEnCentroInformacionDTO";

@injectable()
export class AsesorCrmEnCentroInformacionService
	implements IAsesorCrmEnCentroInformacionService
{
	constructor(
		@inject(TYPES.AsesorCrmEnCentroInformacionRepository)
		private _asesorCrmEnCentroInformacionRepository: IAsesorCrmEnCentroInformacionRepository,
	) {}

	// getAllAsesorCrmEnCentroInformacions(): Promise<IAsesorCrmEnCentroInformacion[]> {
	//   return this._asesorCrmEnCentroInformacionRepository.getAll()
	// }

	// getAsesorCrmEnCentroInformacionById(id: string): Promise<IAsesorCrmEnCentroInformacion | null> {
	//   return this._asesorCrmEnCentroInformacionRepository.getById()
	// }

	// deleteAsesorCrmEnCentroInformacionById(id: string): Promise<IAsesorCrmEnCentroInformacion> {

	// }

	createAsesorCrmEnCentroInformacion(
		data: ICreateAsesorCrmEnCentroInformacion,
	): Promise<number> {
		const dto = new CreateAsesorCrmEnCentroInformacionDTO(data);
		const { asesorCrmId, centroInformacionIds } = dto.getData();

		return this._asesorCrmEnCentroInformacionRepository.transaction(
			async tx => {
				const creations = await tx.asesorCrmEnCentroInformacion.createMany({
					data: centroInformacionIds.map(centroInformacionId => ({
						asesorId: asesorCrmId,
						centroInformacionId,
					})),
					skipDuplicates: true,
				});

				return creations.count;
			},
		);
	}
	updateAsesorCrmEnCentroInformacionById(
		data: IUpdateAsesorCrmEnCentroInformacion,
	): Promise<number> {
		const dto = new UpdateAsesorCrmEnCentroInformacionDTO(data);

		const { asesorCrmId, centroInformacionIds } = dto.getData();

		return this._asesorCrmEnCentroInformacionRepository.transaction(
			async tx => {
				const deletions = await tx.asesorCrmEnCentroInformacion.deleteMany({
					where: {
						asesorId: asesorCrmId,
					},
				});

				const creations = await tx.asesorCrmEnCentroInformacion.createMany({
					data: centroInformacionIds.map(centroInformacionId => ({
						asesorId: asesorCrmId,
						centroInformacionId,
					})),
					skipDuplicates: true,
				});

				return deletions.count + creations.count;
			},
		);
	}
}

// class AsesorCrmEnCentroInformacionServiceError extends Error {
// 	constructor(message: string) {
// 		super();
// 		this.message = message;
// 		this.name = "AsesorCrmEnCentroInformacionServiceError";
// 	}
// }
