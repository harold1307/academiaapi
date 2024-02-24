import type { IGrupo } from "./IGrupo"
import type { ICreateGrupo } from "./ICreateGrupo"
import type { IUpdateGrupo } from "./IUpdateGrupo";

export type UpdateGrupoParams = {
	id: string;
	data: IUpdateGrupo;
}

export type IGrupoRepository = {
  create(data: ICreateGrupo): Promise<IGrupo>;
	getAll(): Promise<IGrupo[]>;
	getById(id: string): Promise<IGrupo | null>;
	update(params: UpdateGrupoParams): Promise<IGrupo>;
	deleteById(id: string): Promise<IGrupo>;
}