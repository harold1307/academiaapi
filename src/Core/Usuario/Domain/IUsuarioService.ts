// import type { ICreateUsuario } from "./ICreateUsuario";
import type { ICreateAdministrativo } from "./ICreateAdministrativo";
import type { ICreateAlumno } from "./ICreateAlumno";
import type { ICreateProfesor } from "./ICreateProfesor";
import type { ICreateUsuario } from "./ICreateUsuario";
import type { IUsuario } from "./IUsuario";
import type {
	UpdateAdministrativoParams,
	UpdateAlumnoParams,
	UpdateProfesorParams,
	UpdateUsuarioParams,
} from "./IUsuarioRepository";
import type { IUsuarioWithInscripciones } from "./IUsuarioWithInscripciones";
// import type { UpdateUsuarioParams } from "./IUsuarioRepository";

export type GetAllUsuariosParams = {
	filters?: Record<string, string[] | undefined | string>;
	withInscripciones?: boolean;
};

export type CreateAlumnoByUsuarioIdParams =
	| {
			__typename: "USUARIO_EXISTENTE";
			usuarioId: string;
			data: ICreateAlumno;
	  }
	| {
			__typename: "NUEVO_USUARIO";
			usuarioData: ICreateUsuario;
			data: ICreateAlumno;
	  };
export type CreateAdministrativoByUsuarioIdParams =
	| {
			__typename: "USUARIO_EXISTENTE";
			usuarioId: string;
			data: ICreateAdministrativo;
	  }
	| {
			__typename: "NUEVO_USUARIO";
			usuarioData: ICreateUsuario;
			data: ICreateAdministrativo;
	  };
export type CreateProfesorByUsuarioIdParams =
	| {
			__typename: "USUARIO_EXISTENTE";
			usuarioId: string;
			data: ICreateProfesor;
	  }
	| {
			__typename: "NUEVO_USUARIO";
			usuarioData: ICreateUsuario;
			data: ICreateProfesor;
	  };

export type IUsuarioService = {
	// createUsuario(data: ICreateUsuario): Promise<IUsuario>;
	getAllUsuarios(
		params?: GetAllUsuariosParams,
	): GetAllUsuariosParams["withInscripciones"] extends true
		? IUsuarioWithInscripciones[]
		: Promise<IUsuario[]>;
	getUsuarioById(id: string): Promise<IUsuario | null>;
	updateUsuarioById(params: UpdateUsuarioParams): Promise<IUsuario>;

	updateAlumnoByUsuarioId(params: UpdateAlumnoParams): Promise<IUsuario>;
	updateAdministrativoByUsuarioId(
		params: UpdateAdministrativoParams,
	): Promise<IUsuario>;
	updateProfesorByUsuarioId(params: UpdateProfesorParams): Promise<IUsuario>;

	createAlumnoByUsuarioId(
		params: CreateAlumnoByUsuarioIdParams,
	): Promise<IUsuario>;
	createAdministrativoByUsuarioId(
		params: CreateAdministrativoByUsuarioIdParams,
	): Promise<IUsuario>;
	createProfesorByUsuarioId(
		params: CreateProfesorByUsuarioIdParams,
	): Promise<IUsuario>;

	// deleteUsuarioById(id: string): Promise<IUsuario>;
};
