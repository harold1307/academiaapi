import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import { Constants } from "../../../Utils/Constants";
import type { ICreateGrupo } from "../Domain/ICreateGrupo";
import type { IGrupo } from "../Domain/IGrupo";
import type {
	IGrupoRepository,
	UpdateGrupoParams,
} from "../Domain/IGrupoRepository";
import type { IGrupoService } from "../Domain/IGrupoService";
import { CreateGrupoDTO } from "../Infrastructure/DTOs/CreateGrupoDTO";
import { UpdateGrupoDTO } from "../Infrastructure/DTOs/UpdateGrupoDTO";

@injectable()
export class GrupoService implements IGrupoService {
	constructor(
		@inject(TYPES.GrupoRepository) private _grupoRepository: IGrupoRepository,
	) {}

	getAllGrupos(): Promise<IGrupo[]> {
		return this._grupoRepository.getAll();
	}

	getGrupoById(id: string): Promise<IGrupo | null> {
		return this._grupoRepository.getById(id);
	}

	async deleteGrupoById(id: string): Promise<IGrupo> {
		const grupo = await this._grupoRepository.getById(id);

		if (!grupo) throw new GrupoServiceError("El grupo no existe");

		if (Constants.STATIC_GROUPS[grupo.nombre as keyof object]) {
			throw new GrupoServiceError("No se puede eliminar este grupo");
		}

		if (grupo.enUso)
			throw new GrupoServiceError("El grupo esta en uso, no se puede eliminar");

		return this._grupoRepository.deleteById(id);
	}

	createGrupo(data: ICreateGrupo): Promise<IGrupo> {
		const dto = new CreateGrupoDTO(data);

		return this._grupoRepository.create(dto.getData());
	}

	async updateGrupoById({ id, data }: UpdateGrupoParams): Promise<IGrupo> {
		const dto = new UpdateGrupoDTO(data);

		const grupo = await this._grupoRepository.getById(id);

		if (!grupo) throw new GrupoServiceError("El grupo no existe");

		if (Constants.STATIC_GROUPS[grupo.nombre as keyof object]) {
			throw new GrupoServiceError("No se puede eliminar este grupo");
		}

		return this._grupoRepository.update({ id, data: dto.getData() });
	}
}

class GrupoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "GrupoServiceError";
	}
}
