import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import { Constants } from "../../../Utils/Constants";
import type { IUsuario } from "../Domain/IUsuario";
import type {
	IUsuarioRepository,
	UpdateAdministrativoParams,
	UpdateAlumnoParams,
	UpdateProfesorParams,
	UpdateUsuarioParams,
} from "../Domain/IUsuarioRepository";
import type {
	CreateAdministrativoByUsuarioIdParams,
	CreateAlumnoByUsuarioIdParams,
	CreateProfesorByUsuarioIdParams,
	GetAllUsuariosParams,
	IUsuarioService,
} from "../Domain/IUsuarioService";
import { CreateAdministrativoDTO } from "../Infrastructure/DTOs/CreateAdministrativoDTO";
import { CreateAlumnoDTO } from "../Infrastructure/DTOs/CreateAlumnoDTO";
import { CreateProfesorDTO } from "../Infrastructure/DTOs/CreateProfesorDTO";
import { CreateUsuarioDTO } from "../Infrastructure/DTOs/CreateUsuarioDTO";
import { UpdateAdministrativoDTO } from "../Infrastructure/DTOs/UpdateAdministrativoDTO";
import { UpdateAlumnoDTO } from "../Infrastructure/DTOs/UpdateAlumnoDTO";
import { UpdateProfesorDTO } from "../Infrastructure/DTOs/UpdateProfesorDTO";
import { UpdateUsuarioDTO } from "../Infrastructure/DTOs/UpdateUsuarioDTO";
import { UsuarioQueryFilterDTO } from "../Infrastructure/DTOs/UsuarioQueryFilterDTO";
import type { IUsuarioWithInscripciones } from "../Domain/IUsuarioWithInscripciones";

@injectable()
export class UsuarioService implements IUsuarioService {
	constructor(
		@inject(TYPES.UsuarioRepository)
		private _usuarioRepository: IUsuarioRepository,
	) {}

	getAllUsuarios(
		params?: GetAllUsuariosParams,
	): Promise<IUsuario[] | IUsuarioWithInscripciones[]> {
		const { filters, withInscripciones } = params || {};

		const filterDTO = new UsuarioQueryFilterDTO(filters);

		if (withInscripciones) {
			return this._usuarioRepository.getAllWithInscripciones({
				filters: filterDTO.getData(),
			});
		}

		return this._usuarioRepository.getAll({
			filters: filterDTO.getData(),
		});
	}

	getUsuarioById(id: string): Promise<IUsuario | null> {
		return this._usuarioRepository.getById(id);
	}

	async updateUsuarioById({
		id,
		data,
	}: UpdateUsuarioParams): Promise<IUsuario> {
		const dto = new UpdateUsuarioDTO(data);

		const usuario = await this._usuarioRepository.getById(id);

		if (!usuario) throw new UsuarioServiceError("El usuario no existe");

		return this._usuarioRepository.update({
			id,
			data: dto.getData(),
		});
	}

	async createAdministrativoByUsuarioId(
		params: CreateAdministrativoByUsuarioIdParams,
	): Promise<IUsuario> {
		if (params.__typename === "USUARIO_EXISTENTE") {
			const { data, usuarioId, __typename } = params;

			const usuario = await this._usuarioRepository.getById(usuarioId);

			if (!usuario) throw new UsuarioServiceError("El usuario no existe");

			if (usuario.administrativo)
				throw new UsuarioServiceError(
					"El usuario ya tiene un acceso de administrativo",
				);

			const dto = new CreateAdministrativoDTO(data);

			return this._usuarioRepository.createAdministrativo({
				__typename,
				administrativo: dto.getData(),
				usuarioId,
				joinGroup: !usuario.grupos.some(
					g => g.grupo.nombre === Constants.STATIC_GROUPS.ADMINISTRATIVOS,
				),
			});
		}

		const { __typename, data, usuarioData } = params;

		const usuarioDTO = new CreateUsuarioDTO(usuarioData);
		const dto = new CreateAdministrativoDTO(data);

		return this._usuarioRepository.createAdministrativo({
			__typename,
			administrativo: dto.getData(),
			usuarioData: usuarioDTO.getData(),
		});
	}

	async createAlumnoByUsuarioId(
		params: CreateAlumnoByUsuarioIdParams,
	): Promise<IUsuario> {
		if (params.__typename === "USUARIO_EXISTENTE") {
			const { data, usuarioId, __typename } = params;

			const usuario = await this._usuarioRepository.getById(usuarioId);

			if (!usuario) throw new UsuarioServiceError("El usuario no existe");

			if (usuario.alumno)
				throw new UsuarioServiceError(
					"El usuario ya tiene un acceso de alumno",
				);

			const dto = new CreateAlumnoDTO(data);

			return this._usuarioRepository.createAlumno({
				__typename,
				alumno: dto.getData(),
				usuarioId,
				joinGroup: !usuario.grupos.some(
					g => g.grupo.nombre === Constants.STATIC_GROUPS.ALUMNOS,
				),
			});
		}

		const { __typename, data, usuarioData } = params;

		const usuarioDTO = new CreateUsuarioDTO(usuarioData);
		const dto = new CreateAlumnoDTO(data);

		return this._usuarioRepository.createAlumno({
			__typename,
			alumno: dto.getData(),
			usuarioData: usuarioDTO.getData(),
		});
	}

	async createProfesorByUsuarioId(
		params: CreateProfesorByUsuarioIdParams,
	): Promise<IUsuario> {
		if (params.__typename === "USUARIO_EXISTENTE") {
			const { data, usuarioId, __typename } = params;

			const usuario = await this._usuarioRepository.getById(usuarioId);

			if (!usuario) throw new UsuarioServiceError("El usuario no existe");

			if (usuario.profesor)
				throw new UsuarioServiceError(
					"El usuario ya tiene un acceso de profesor",
				);

			const dto = new CreateProfesorDTO(data);

			return this._usuarioRepository.createProfesor({
				__typename,
				profesor: dto.getData(),
				usuarioId,
				joinGroup: !usuario.grupos.some(
					g => g.grupo.nombre === Constants.STATIC_GROUPS.PROFESORES,
				),
			});
		}

		const { __typename, data, usuarioData } = params;

		const usuarioDTO = new CreateUsuarioDTO(usuarioData);
		const dto = new CreateProfesorDTO(data);

		return this._usuarioRepository.createProfesor({
			__typename,
			profesor: dto.getData(),
			usuarioData: usuarioDTO.getData(),
		});
	}

	async updateAdministrativoByUsuarioId({
		id,
		data,
	}: UpdateAdministrativoParams): Promise<IUsuario> {
		const dto = new UpdateAdministrativoDTO(data);
		const usuario = await this._usuarioRepository.getById(id);

		if (!usuario) throw new UsuarioServiceError("El usuario no existe");

		if (!usuario.administrativo)
			throw new UsuarioServiceError(
				"El usuario no tiene acceso de administrativo",
			);

		return this._usuarioRepository.updateAdministrativo({
			id,
			data: dto.getData(),
		});
	}

	async updateAlumnoByUsuarioId({
		id,
		inscripcionId,
		data,
	}: UpdateAlumnoParams): Promise<IUsuario> {
		const dto = new UpdateAlumnoDTO(data);
		const usuario = await this._usuarioRepository.getById(id);

		if (!usuario) throw new UsuarioServiceError("El usuario no existe");

		if (!usuario.alumno)
			throw new UsuarioServiceError("El usuario no tiene acceso de alumno");

		return this._usuarioRepository.updateAlumno({
			id,
			inscripcionId,
			data: dto.getData(),
		});
	}

	async updateProfesorByUsuarioId({
		id,
		data,
	}: UpdateProfesorParams): Promise<IUsuario> {
		const dto = new UpdateProfesorDTO(data);
		const usuario = await this._usuarioRepository.getById(id);

		if (!usuario) throw new UsuarioServiceError("El usuario no existe");

		if (!usuario.profesor)
			throw new UsuarioServiceError("El usuario no tiene acceso de profesor");

		return this._usuarioRepository.updateProfesor({
			id,
			data: dto.getData(),
		});
	}
}

class UsuarioServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "UsuarioServiceError";
	}
}
