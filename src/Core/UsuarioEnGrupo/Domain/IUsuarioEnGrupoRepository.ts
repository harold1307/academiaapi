import type { IUsuarioEnGrupo } from "./IUsuarioEnGrupo";
import type { ICreateUsuarioEnGrupo } from "./ICreateUsuarioEnGrupo";
import type { IUpdateUsuarioEnGrupo } from "./IUpdateUsuarioEnGrupo";

export type UpdateUsuarioEnGrupoParams = {
	id: string;
	data: IUpdateUsuarioEnGrupo;
};

export type DeleteUsuarioEnGrupoParams = {
	usuarioId: string;
	grupoId: string;
};

export type IUsuarioEnGrupoRepository = {
	create(data: ICreateUsuarioEnGrupo): Promise<IUsuarioEnGrupo>;
	// getAll(): Promise<IUsuarioEnGrupo[]>;
	// getById(id: string): Promise<IUsuarioEnGrupo | null>;
	// update(params: UpdateUsuarioEnGrupoParams): Promise<IUsuarioEnGrupo>;
	deleteById(params: DeleteUsuarioEnGrupoParams): Promise<IUsuarioEnGrupo>;
};
