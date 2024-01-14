import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IVarianteCursoWithCurso } from "../Domain/IVarianteCursoWithCurso";
import type { IVarianteCurso } from "../Domain/IVarianteCurso";
import type { IVarianteCursoRepository } from "../Domain/IVarianteCursoRepository";
import type {
	ICreateVarianteCursoParams,
	IUpdateVarianteCursoByIdParams,
	IVarianteCursoService,
} from "../Domain/IVarianteCursoService";
import type { IVarianteCursoWithAsignaturas } from "../Domain/IVarianteCursoWithAsignaturas";
import { CreateVarianteCursoDTO } from "../Infrastructure/DTOs/CreateVarianteCursoDTO";
import { UpdateVarianteCursoDTO } from "../Infrastructure/DTOs/UpdateVarianteCursoDTO";

@injectable()
export class VarianteCursoService implements IVarianteCursoService {
	constructor(
		@inject(TYPES.VarianteCursoRepository)
		private _varianteCursoRepository: IVarianteCursoRepository,
	) {}

	createVarianteCurso({
		cursoId,
		data,
	}: ICreateVarianteCursoParams): Promise<IVarianteCursoWithCurso> {
		const dto = new CreateVarianteCursoDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear variante de curso",
				JSON.stringify(validation.error, null, 2),
			);
			throw new VarianteCursoServiceError(
				"Esquema para crear variante de curso invalido.",
			);
		}

		return this._varianteCursoRepository.create({
			cursoId,
			data: validation.data,
		});
	}

	async updateVarianteCurso({
		id,
		data,
	}: IUpdateVarianteCursoByIdParams): Promise<IVarianteCurso> {
		const varianteCurso = await this._varianteCursoRepository.getById(id);

		if (!varianteCurso)
			throw new VarianteCursoServiceError("La variante de curso no existe");

		const dto = new UpdateVarianteCursoDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar variante de curso",
				JSON.stringify(validation.error, null, 2),
			);
			throw new VarianteCursoServiceError(
				"Esquema para actualizar variante de curso invalido.",
			);
		}

		return this._varianteCursoRepository.updateById({
			id,
			data: validation.data,
		});
	}

	async deleteVarianteCurso(id: string): Promise<IVarianteCurso> {
		const varianteWithAsignaturas =
			await this._varianteCursoRepository.withAsignaturasGetById(id);

		if (!varianteWithAsignaturas)
			throw new VarianteCursoServiceError("La variante de curso no existe");

		if (varianteWithAsignaturas.estado)
			throw new VarianteCursoServiceError("La asignatura esta activada");

		if (varianteWithAsignaturas.asignaturas.length > 0)
			throw new VarianteCursoServiceError(
				"La variante de curso tiene asignaturas enlazadas",
			);

		return this._varianteCursoRepository.deleteById(id);
	}

	getVarianteCursoWithAsignaturasById(
		id: string,
	): Promise<IVarianteCursoWithAsignaturas | null> {
		return this._varianteCursoRepository.withAsignaturasGetById(id);
	}
}

class VarianteCursoServiceError extends Error {
	constructor(message: string) {
		super();

		this.message = message;
		this.name = "VarianteCursoServiceError";
	}
}
