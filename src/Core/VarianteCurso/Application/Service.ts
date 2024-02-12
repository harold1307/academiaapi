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

		return this._varianteCursoRepository.create({
			cursoId,
			data: dto.getData(),
		});
	}

	async updateVarianteCurso({
		id,
		data,
	}: IUpdateVarianteCursoByIdParams): Promise<IVarianteCurso> {
		const dto = new UpdateVarianteCursoDTO(data);
		const valid = dto.getData();

		const varianteCurso =
			await this._varianteCursoRepository.withAsignaturasGetById(id);

		if (!varianteCurso)
			throw new VarianteCursoServiceError("La variante de curso no existe");

		if (!varianteCurso.asignaturas.length && !!valid.estado) {
			throw new VarianteCursoServiceError(
				"La variante de curso necesita asignaturas para poder habilitarse",
			);
		}

		return this._varianteCursoRepository.updateById({
			id,
			data: valid,
		});
	}

	async deleteVarianteCurso(id: string): Promise<IVarianteCurso> {
		const varianteWithAsignaturas =
			await this._varianteCursoRepository.withAsignaturasGetById(id);

		if (!varianteWithAsignaturas)
			throw new VarianteCursoServiceError("La variante de curso no existe");

		if (varianteWithAsignaturas.estado)
			throw new VarianteCursoServiceError(
				"La variante de curso esta activada, no se puede eliminar",
			);

		if (varianteWithAsignaturas.asignaturas.length > 0)
			throw new VarianteCursoServiceError(
				"La variante de curso tiene asignaturas enlazadas, no se puede eliminar",
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
