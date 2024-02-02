import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignatura } from "../Domain/IAsignatura";
import type {
	IAsignaturaRepository,
	UpdateAsignaturaParams,
} from "../Domain/IAsignaturaRepository";
import type { IAsignaturaService } from "../Domain/IAsignaturaService";
import type { ICreateAsignatura } from "../Domain/ICreateAsignatura";
import { CreateAsignaturaDTO } from "../Infrastructure/DTOs/CreateAsignaturaDTO";
import { UpdateAsignaturaDTO } from "../Infrastructure/DTOs/UpdateAsignaturaDTO";

@injectable()
export class AsignaturaService implements IAsignaturaService {
	constructor(
		@inject(TYPES.AsignaturaRepository)
		private _asignaturaRepository: IAsignaturaRepository,
	) {}

	async createAsignatura(data: ICreateAsignatura): Promise<IAsignatura> {
		const dto = new CreateAsignaturaDTO(data);

		return this._asignaturaRepository.create(dto.getData());
	}

	async getAllAsignaturas(): Promise<IAsignatura[]> {
		return this._asignaturaRepository.getAll();
	}

	async getAsignaturaById(id: string): Promise<IAsignatura | null> {
		return this._asignaturaRepository.getById(id);
	}

	async deleteAsignaturaById(id: string): Promise<IAsignatura> {
		const asignatura = await this._asignaturaRepository.getById(id);

		if (!asignatura)
			throw new AsignaturaServiceError("La asignatura no existe");

		if (asignatura.enUso)
			throw new AsignaturaServiceError(
				"La asignatura esta en uso, no se puede eliminar",
			);

		return this._asignaturaRepository.deleteById(id);
	}

	async updateAsignaturaById({
		id,
		data,
	}: UpdateAsignaturaParams): Promise<IAsignatura> {
		const dto = new UpdateAsignaturaDTO(data);
		const valid = dto.getData();

		const asignatura = await this._asignaturaRepository.getById(id);

		if (!asignatura)
			throw new AsignaturaServiceError("La asignatura no existe");

		if (valid.nombre && valid.nombre !== asignatura.nombre && asignatura.enUso)
			throw new AsignaturaServiceError(
				"La asignatura esta en uso, no se puede cambiar el nombre",
			);

		return this._asignaturaRepository.update({
			id: id,
			data: dto.getData(),
		});
	}
}

class AsignaturaServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AsignaturaServiceError";
	}
}
