import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IPerfilPractica } from "../Domain/IPerfilPractica";
import type {
	IPerfilPracticaRepository,
	UpdatePerfilPracticaParams,
} from "../Domain/IPerfilPracticaRepository";
import type { IPerfilPracticaService } from "../Domain/IPerfilPracticaService";
import type { ICreatePerfilPractica } from "../Domain/ICreatePerfilPractica";
import { CreatePerfilPracticaDTO } from "../Infrastructure/DTOs/CreatePerfilPracticaDTO";
import { UpdatePerfilPracticaDTO } from "../Infrastructure/DTOs/UpdatePerfilPracticaDTO";

@injectable()
export class PerfilPracticaService implements IPerfilPracticaService {
	constructor(
		@inject(TYPES.PerfilPracticaRepository)
		private _perfilPracticaRepository: IPerfilPracticaRepository,
	) {}

	getAllPerfilesPractica(): Promise<IPerfilPractica[]> {
		return this._perfilPracticaRepository.getAll();
	}

	getPerfilPracticaById(id: string): Promise<IPerfilPractica | null> {
		return this._perfilPracticaRepository.getById(id);
	}

	async deletePerfilPracticaById(id: string): Promise<IPerfilPractica> {
		const perfil = await this._perfilPracticaRepository.getById(id);

		if (!perfil)
			throw new PerfilPracticaServiceError("El perfil de practica no existe");

		if (perfil.enUso)
			throw new PerfilPracticaServiceError(
				"El perfil de practica esta en uso, no se puede eliminar",
			);

		return this._perfilPracticaRepository.deleteById(id);
	}

	createPerfilPractica(data: ICreatePerfilPractica): Promise<IPerfilPractica> {
		const dto = new CreatePerfilPracticaDTO(data);

		return this._perfilPracticaRepository.create(dto.getData());
	}

	async updatePerfilPracticaById({
		id,
		data,
	}: UpdatePerfilPracticaParams): Promise<IPerfilPractica> {
		const dto = new UpdatePerfilPracticaDTO(data);

		const perfil = await this._perfilPracticaRepository.getById(id);

		if (!perfil)
			throw new PerfilPracticaServiceError("El perfil de practica no existe");

		if (perfil.enUso)
			throw new PerfilPracticaServiceError(
				"El perfil de practica esta en uso, no se puede actualizar",
			);

		return this._perfilPracticaRepository.update({ id, data: dto.getData() });
	}
}

class PerfilPracticaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "PerfilPracticaServiceError";
	}
}
