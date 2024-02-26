import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateUsuario } from "../Domain/ICreateUsuario";
import type { IUsuario } from "../Domain/IUsuario";
import type {
	IUsuarioRepository,
	UpdateUsuarioParams,
} from "../Domain/IUsuarioRepository";
import type { IUsuarioService } from "../Domain/IUsuarioService";

@injectable()
export class UsuarioService implements IUsuarioService {
	constructor(
		@inject(TYPES.UsuarioRepository)
		private _usuarioRepository: IUsuarioRepository,
	) {}

	getAllUsuarios(): Promise<IUsuario[]> {
		return this._usuarioRepository.getAll();
	}

	getUsuarioById(id: string): Promise<IUsuario | null> {
		return this._usuarioRepository.getById(id);
	}

	deleteUsuarioById(id: string): Promise<IUsuario> {
		throw new UsuarioServiceError("Not implemented");
	}

	createUsuario(data: ICreateUsuario): Promise<IUsuario> {
		throw new UsuarioServiceError("Not implemented");
	}
	updateUsuarioById(params: UpdateUsuarioParams): Promise<IUsuario> {
		throw new UsuarioServiceError("Not implemented");
	}
}

class UsuarioServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "UsuarioServiceError";
	}
}
