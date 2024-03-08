import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateResponsableCrm } from "../Domain/ICreateResponsableCrm";
import type { IResponsableCrm } from "../Domain/IResponsableCrm";
import type {
	IResponsableCrmRepository,
	UpdateResponsableCrmParams,
} from "../Domain/IResponsableCrmRepository";
import type { IResponsableCrmService } from "../Domain/IResponsableCrmService";
import { CreateResponsableCrmDTO } from "../Infrastructure/DTOs/CreateResponsableCrmDTO";
import { UpdateResponsableCrmDTO } from "../Infrastructure/DTOs/UpdateResponsableCrmDTO";

@injectable()
export class ResponsableCrmService implements IResponsableCrmService {
	constructor(
		@inject(TYPES.ResponsableCrmRepository)
		private _responsableCrmRepository: IResponsableCrmRepository,
	) {}

	getAllResponsableCrms(): Promise<IResponsableCrm[]> {
		return this._responsableCrmRepository.getAll();
	}

	getResponsableCrmById(id: string): Promise<IResponsableCrm | null> {
		return this._responsableCrmRepository.getById(id);
	}

	async deleteResponsableCrmById(id: string): Promise<IResponsableCrm> {
		const responsable = await this._responsableCrmRepository.getById(id);

		if (!responsable)
			throw new ResponsableCrmServiceError("El responsable de crm no existe");

		return this._responsableCrmRepository.deleteById(id);
	}

	createResponsableCrm(data: ICreateResponsableCrm): Promise<IResponsableCrm> {
		const dto = new CreateResponsableCrmDTO(data);

		return this._responsableCrmRepository.create(dto.getData());
	}

	async updateResponsableCrmById({
		id,
		data,
	}: UpdateResponsableCrmParams): Promise<IResponsableCrm> {
		const dto = new UpdateResponsableCrmDTO(data);

		const responsable = await this._responsableCrmRepository.getById(id);

		if (!responsable)
			throw new ResponsableCrmServiceError("El responsable de crm no existe");

		return this._responsableCrmRepository.update({ id, data: dto.getData() });
	}
}

class ResponsableCrmServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ResponsableCrmServiceError";
	}
}
