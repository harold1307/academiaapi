import type { ICreateAdministrativo } from "./ICreateAdministrativo";
import type { ICreateAlumno } from "./ICreateAlumno";
import type { ICreateProfesor } from "./ICreateProfesor";
import type { ICreateUsuario } from "./ICreateUsuario";
import type { IUpdateAdministrativo } from "./IUpdateAdministrativo";
import type { IUpdateAlumno } from "./IUpdateAlumno";
import type { IUpdateProfesor } from "./IUpdateProfesor";
import type { IUpdateUsuario } from "./IUpdateUsuario";
import type { IUsuario } from "./IUsuario";
import type { IUsuarioQueryFilter } from "./IUsuarioQueryFilter";
import type { IUsuarioWithInscripciones } from "./IUsuarioWithInscripciones";

export type UpdateUsuarioParams = {
	id: string;
	data: IUpdateUsuario;
};

export type CreateAlumnoParams =
	| {
			__typename: "NUEVO_USUARIO";
			usuarioData: ICreateUsuario;
			alumno: ICreateAlumno;
	  }
	| {
			__typename: "USUARIO_EXISTENTE";
			usuarioId: string;
			alumno: ICreateAlumno;
			joinGroup: boolean;
	  };

export type CreateAdministrativoParams =
	| {
			__typename: "NUEVO_USUARIO";
			usuarioData: ICreateUsuario;
			administrativo: ICreateAdministrativo;
	  }
	| {
			__typename: "USUARIO_EXISTENTE";
			usuarioId: string;
			administrativo: ICreateAdministrativo;
			joinGroup: boolean;
	  };

export type CreateProfesorParams =
	| {
			__typename: "NUEVO_USUARIO";
			usuarioData: ICreateUsuario;
			profesor: ICreateProfesor;
	  }
	| {
			__typename: "USUARIO_EXISTENTE";
			usuarioId: string;
			profesor: ICreateProfesor;
			joinGroup: boolean;
	  };

export type UpdateAlumnoParams = {
	id: string;
	inscripcionId: string;
	data: IUpdateAlumno;
};

export type UpdateAdministrativoParams = {
	id: string;
	data: IUpdateAdministrativo;
};

export type UpdateProfesorParams = {
	id: string;
	data: IUpdateProfesor;
};

export type GetAllUsuariosParams = {
	filters?: IUsuarioQueryFilter;
};

export type IUsuarioRepository = {
	// create(data: ICreateUsuario): Promise<IUsuario>;
	createAlumno(params: CreateAlumnoParams): Promise<IUsuario>;
	createAdministrativo(params: CreateAdministrativoParams): Promise<IUsuario>;
	createProfesor(params: CreateProfesorParams): Promise<IUsuario>;

	updateAlumno(params: UpdateAlumnoParams): Promise<IUsuario>;
	updateAdministrativo(params: UpdateAdministrativoParams): Promise<IUsuario>;
	updateProfesor(params: UpdateProfesorParams): Promise<IUsuario>;

	getAll(params?: GetAllUsuariosParams): Promise<IUsuario[]>;
	getAllWithInscripciones(
		params?: GetAllUsuariosParams,
	): Promise<IUsuarioWithInscripciones[]>;
	getById(id: string): Promise<IUsuario | null>;
	update(params: UpdateUsuarioParams): Promise<IUsuario>;
	// deleteById(id: string): Promise<IUsuario>;
};
