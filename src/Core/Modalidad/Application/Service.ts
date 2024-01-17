import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateModalidad } from "../Domain/ICreateModalidad";
import type { IModalidad } from "../Domain/IModalidad";
import type {
	IModalidadRepository,
	IUpdateModalidadParams,
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
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear de modalidad",
				validation.error,
			);
			throw new ModalidadServiceError(
				"Esquema para crear de modalidad invalido.",
			);
		}

		return this._modalidadRepository.create(validation.data);
	}

	getAllModalidades(): Promise<IModalidad[]> {
		return this._modalidadRepository.getAll();
	}

	getModalidadById(id: string): Promise<IModalidad | null> {
		return this._modalidadRepository.getById(id);
	}

	deleteModalidadById(id: string): Promise<IModalidad> {
		return this._modalidadRepository.deleteById(id);
	}

	updateModalidadById({
		data,
		id,
	}: IUpdateModalidadParams): Promise<IModalidad> {
		const dto = new UpdateModalidadDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar de modalidad",
				validation.error,
			);
			throw new ModalidadServiceError(
				"Esquema para actualizar de modalidad invalido.",
			);
		}

		return this._modalidadRepository.update({ data: validation.data, id });
	}
}

class ModalidadServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ModalidadServiceError";
	}
}
