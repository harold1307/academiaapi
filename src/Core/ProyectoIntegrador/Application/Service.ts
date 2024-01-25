import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateProyectoIntegrador } from "../Domain/ICreateProyectoIntegrador";
import type { IProyectoIntegrador } from "../Domain/IProyectoIntegrador";
import type {
	IProyectoIntegradorRepository,
	IUpdateProyectoIntegradorParams,
} from "../Domain/IProyectoIntegradorRepository";
import type { IProyectoIntegradorService } from "../Domain/IProyectoIntegradorService";
import { CreateProyectoIntegradorDTO } from "../Infrastructure/DTOs/CreateProyectoIntegradorDTO";
import { UpdateProyectoIntegradorDTO } from "../Infrastructure/DTOs/UpdateProyectoIntegradorDTO";

@injectable()
export class ProyectoIntegradorService implements IProyectoIntegradorService {
	constructor(
		@inject(TYPES.ProyectoIntegradorRepository)
		private _proyectoIntegradorRepository: IProyectoIntegradorRepository,
	) {}

	getAllProyectosIntegradores(): Promise<IProyectoIntegrador[]> {
		return this._proyectoIntegradorRepository.getAll();
	}

	getProyectoIntegradorById(id: string): Promise<IProyectoIntegrador | null> {
		return this._proyectoIntegradorRepository.getById(id);
	}

	async deleteProyectoIntegradorById(id: string): Promise<IProyectoIntegrador> {
		const proyecto = await this._proyectoIntegradorRepository.getById(id);

		if (!proyecto)
			throw new ProyectoIntegradorServiceError(
				"Proyecto integrador no encontrado",
			);

		if (proyecto.enUso)
			throw new ProyectoIntegradorServiceError(
				"El proyecto integrador esta en uso, no se puede eliminar",
			);

		return this._proyectoIntegradorRepository.deleteById(id);
	}

	createProyectoIntegrador(
		data: ICreateProyectoIntegrador,
	): Promise<IProyectoIntegrador> {
		const dto = new CreateProyectoIntegradorDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear proyecto integrador",
				JSON.stringify(validation.error, null, 2),
			);
			throw new ProyectoIntegradorServiceError(
				"Esquema para crear proyecto integrador invalido",
			);
		}

		return this._proyectoIntegradorRepository.create(validation.data);
	}
	async updateProyectoIntegradorById({
		id,
		data,
	}: IUpdateProyectoIntegradorParams): Promise<IProyectoIntegrador> {
		const proyecto = await this._proyectoIntegradorRepository.getById(id);

		if (!proyecto)
			throw new ProyectoIntegradorServiceError(
				"Proyecto integrador no encontrado",
			);

		if (proyecto.enUso)
			throw new ProyectoIntegradorServiceError(
				"El proyecto integrador esta en uso, no se puede actualizar",
			);

		const dto = new UpdateProyectoIntegradorDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar proyecto integrador",
				JSON.stringify(validation.error, null, 2),
			);
			throw new ProyectoIntegradorServiceError(
				"Esquema para actualizar proyecto integrador invalido",
			);
		}

		return this._proyectoIntegradorRepository.update({
			id,
			data: validation.data,
		});
	}
}

class ProyectoIntegradorServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ProyectoIntegradorServiceError";
	}
}
