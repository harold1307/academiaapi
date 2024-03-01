import type { ICreateUsuarioEnGrupo } from "./ICreateUsuarioEnGrupo";
import type { IUsuarioEnGrupo } from "./IUsuarioEnGrupo";
import type { DeleteUsuarioEnGrupoParams } from "./IUsuarioEnGrupoRepository";
// import type { UpdateUsuarioEnGrupoParams } from "./IUsuarioEnGrupoRepository";

export type IUsuarioEnGrupoService = {
	createUsuarioEnGrupo(data: ICreateUsuarioEnGrupo): Promise<IUsuarioEnGrupo>;
	// getAllUsuarioEnGrupos(): Promise<IUsuarioEnGrupo[]>;
	// getUsuarioEnGrupoById(id: string): Promise<IUsuarioEnGrupo | null>;
	// updateUsuarioEnGrupoById(params: UpdateUsuarioEnGrupoParams): Promise<IUsuarioEnGrupo>;
	deleteUsuarioEnGrupoById(
		params: DeleteUsuarioEnGrupoParams,
	): Promise<IUsuarioEnGrupo>;
};
