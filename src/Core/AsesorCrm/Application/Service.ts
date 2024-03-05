import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsesorCrm } from "../Domain/IAsesorCrm";
import type { IAsesorCrmRepository } from "../Domain/IAsesorCrmRepository";
import type { IAsesorCrmService } from "../Domain/IAsesorCrmService";
import type { ICreateAsesorCrm } from "../Domain/ICreateAsesorCrm";
import { CreateAsesorCrmDTO } from "../Infrastructure/DTOs/CreateAsesorCrmDTO";

@injectable()
export class AsesorCrmService implements IAsesorCrmService {
	constructor(
		@inject(TYPES.AsesorCrmRepository)
		private _asesorCrmRepository: IAsesorCrmRepository,
	) {}

	getAllAsesorCrms(): Promise<IAsesorCrm[]> {
		return this._asesorCrmRepository.getAll();
	}

	getAsesorCrmById(id: string): Promise<IAsesorCrm | null> {
		return this._asesorCrmRepository.getById(id);
	}

	deleteAsesorCrmById(id: string): Promise<IAsesorCrm> {
		return this._asesorCrmRepository.deleteById(id);
	}

	createAsesorCrm(data: ICreateAsesorCrm): Promise<IAsesorCrm> {
		const dto = new CreateAsesorCrmDTO(data);

		return this._asesorCrmRepository.create(dto.getData());
	}
	// updateAsesorCrmById(params: UpdateAsesorCrmParams): Promise<IAsesorCrm> {}
}

// class AsesorCrmServiceError extends Error {
// 	constructor(message: string) {
// 		super();
// 		this.message = message;
// 		this.name = "AsesorCrmServiceError";
// 	}
// }
