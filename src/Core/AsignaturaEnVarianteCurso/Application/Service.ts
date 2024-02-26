import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaEnVarianteCurso } from "../Domain/IAsignaturaEnVarianteCurso";
import type {
	IAsignaturaEnVarianteCursoRepository,
	UpdateAsignaturaEnVarianteCursoParams,
} from "../Domain/IAsignaturaEnVarianteCursoRepository";
import type {
	IAsignaturaEnVarianteCursoService,
	ICreateAsignaturaEnVarianteCursoParams,
} from "../Domain/IAsignaturaEnVarianteCursoService";
import { CreateAsignaturaEnVarianteCursoDTO } from "../Infrastructure/DTOs/CreateAsignaturaEnVarianteCursoDTO";
import { UpdateAsignaturaEnVarianteCursoDTO } from "../Infrastructure/DTOs/UpdateAsignaturaEnVarianteCursoDTO";

@injectable()
export class AsignaturaEnVarianteCursoService
	implements IAsignaturaEnVarianteCursoService
{
	constructor(
		@inject(TYPES.AsignaturaEnVarianteCursoRepository)
		private _asignaturaEnVarianteCursoRepository: IAsignaturaEnVarianteCursoRepository,
	) {}

	async createAsignaturaEnVarianteCurso({
		asignaturaId,
		varianteCursoId,
		data,
	}: ICreateAsignaturaEnVarianteCursoParams): Promise<IAsignaturaEnVarianteCurso> {
		const dto = new CreateAsignaturaEnVarianteCursoDTO({
			...data,
			varianteCursoId,
			asignaturaId,
		});

		return this._asignaturaEnVarianteCursoRepository.create(dto.getData());
	}

	async updateAsignaturaEnVarianteCursoById({
		id,
		data,
	}: UpdateAsignaturaEnVarianteCursoParams): Promise<IAsignaturaEnVarianteCurso> {
		const dto = new UpdateAsignaturaEnVarianteCursoDTO(data);

		const asignaturaEnVarianteCurso =
			await this._asignaturaEnVarianteCursoRepository.getById(id);

		if (!asignaturaEnVarianteCurso)
			throw new AsignaturaEnVarianteCursoServiceError(
				"La asignatura en variante de curso no existe",
			);

		try {
			new CreateAsignaturaEnVarianteCursoDTO({
				...asignaturaEnVarianteCurso,
				varianteCursoId: asignaturaEnVarianteCurso.varianteCursoId,
				...Object.fromEntries(
					Object.entries(dto.getData()).filter(([, v]) => v !== undefined),
				),
			});
		} catch (e) {
			throw new AsignaturaEnVarianteCursoServiceError(
				"La asignatura en variante curso a actualizar es invalido",
			);
		}

		return this._asignaturaEnVarianteCursoRepository.update({
			id,
			data: dto.getData(),
		});
	}

	async deleteAsignaturaEnVarianteCursoById(
		id: string,
	): Promise<IAsignaturaEnVarianteCurso> {
		const asignaturaEnVarianteCurso =
			this._asignaturaEnVarianteCursoRepository.getById(id);

		if (!asignaturaEnVarianteCurso)
			throw new AsignaturaEnVarianteCursoServiceError(
				"La asignatura en variante de curso no existe",
			);

		return this._asignaturaEnVarianteCursoRepository.deleteById(id);
	}

	getAsignaturaEnVarianteCursoById(
		id: string,
	): Promise<IAsignaturaEnVarianteCurso | null> {
		return this._asignaturaEnVarianteCursoRepository.getById(id);
	}
}

class AsignaturaEnVarianteCursoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "AsignaturaEnVarianteCursoServiceError";
	}
}
