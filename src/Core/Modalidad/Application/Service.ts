import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateModalidad } from "../Domain/ICreateModalidad";
import type { IModalidad } from "../Domain/IModalidad";
import type {
	IModalidadRepository,
	UpdateModalidadParams,
} from "../Domain/IModalidadRepository";
import type { IModalidadService } from "../Domain/IModalidadService";
import { CreateModalidadDTO } from "../Infrastructure/DTOs/CreateModalidadDTO";
import { UpdateModalidadDTO } from "../Infrastructure/DTOs/UpdateModalidadDTO";

@injectable()
export class ModalidadService implements IModalidadService {
	constructor(
		@inject(TYPES.ModalidadRepository)
		private _modalidadRepository: IModalidadRepository,
	) {}

	createModalidad(data: ICreateModalidad): Promise<IModalidad> {
		const dto = new CreateModalidadDTO(data);

		return this._modalidadRepository.create(dto.getData());
	}

	getAllModalidades(): Promise<IModalidad[]> {
		return this._modalidadRepository.getAll();
	}

	getModalidadById(id: string): Promise<IModalidad | null> {
		return this._modalidadRepository.getById(id);
	}

	async deleteModalidadById(id: string): Promise<IModalidad> {
		const modalidad = await this._modalidadRepository.getById(id);

		if (!modalidad) throw new ModalidadServiceError("La modalidad no existe");

		if (modalidad.enUso)
			throw new ModalidadServiceError(
				"La modalidad esta en uso, no se puede eliminar",
			);

		return this._modalidadRepository.deleteById(id);
	}

	updateModalidadById({
		data,
		id,
	}: UpdateModalidadParams): Promise<IModalidad> {
		const dto = new UpdateModalidadDTO(data);

		return this._modalidadRepository.update({ data: dto.getData(), id });
	}
}

class ModalidadServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ModalidadServiceError";
	}
}
