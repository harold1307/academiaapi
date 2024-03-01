import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateUsuarioEnGrupo } from "../Domain/ICreateUsuarioEnGrupo";
import type { IUsuarioEnGrupo } from "../Domain/IUsuarioEnGrupo";
import type {
	DeleteUsuarioEnGrupoParams,
	IUsuarioEnGrupoRepository,
} from "../Domain/IUsuarioEnGrupoRepository";
import type { IUsuarioEnGrupoService } from "../Domain/IUsuarioEnGrupoService";
import { CreateUsuarioEnGrupoDTO } from "../Infrastructure/DTOs/CreateUsuarioEnGrupoDTO";

@injectable()
export class UsuarioEnGrupoService implements IUsuarioEnGrupoService {
	constructor(
		@inject(TYPES.UsuarioEnGrupoRepository)
		private _usuarioEnGrupoRepository: IUsuarioEnGrupoRepository,
	) {}

	// getAllUsuarioEnGrupos(): Promise<IUsuarioEnGrupo[]> {
	//   return this._usuarioEnGrupoRepository.getAll()
	// }

	// getUsuarioEnGrupoById(id: string): Promise<IUsuarioEnGrupo | null> {
	//   return this._usuarioEnGrupoRepository.getById()
	// }

	deleteUsuarioEnGrupoById({
		grupoId,
		usuarioId,
	}: DeleteUsuarioEnGrupoParams): Promise<IUsuarioEnGrupo> {
		return this._usuarioEnGrupoRepository.deleteById({ usuarioId, grupoId });
	}

	createUsuarioEnGrupo(data: ICreateUsuarioEnGrupo): Promise<IUsuarioEnGrupo> {
		const dto = new CreateUsuarioEnGrupoDTO(data);

		return this._usuarioEnGrupoRepository.create(dto.getData());
	}
	// updateUsuarioEnGrupoById(params: UpdateUsuarioEnGrupoParams): Promise<IUsuarioEnGrupo> {}
}

// class UsuarioEnGrupoServiceError extends Error {
// 	constructor(message: string) {
// 		super();
// 		this.message = message;
// 		this.name = "UsuarioEnGrupoServiceError";
// 	}
// }
