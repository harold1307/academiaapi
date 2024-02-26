import type { ICreateUsuario } from "./ICreateUsuario";
import type { IUsuario } from "./IUsuario";
// import type { UpdateUsuarioParams } from "./IUsuarioRepository";

type GetAllUsuariosParams = {
	filters?: Record<string, string>;
};

export type IUsuarioService = {
	createUsuario(data: ICreateUsuario): Promise<IUsuario>;
	getAllUsuarios(params?: GetAllUsuariosParams): Promise<IUsuario[]>;
	getUsuarioById(id: string): Promise<IUsuario | null>;
	// updateUsuarioById(params: UpdateUsuarioParams): Promise<IUsuario>;
	// deleteUsuarioById(id: string): Promise<IUsuario>;
};
