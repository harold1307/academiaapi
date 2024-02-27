import type { IGrupo } from "./IGrupo";
import type { ICreateGrupo } from "./ICreateGrupo";
import type { UpdateGrupoParams } from "./IGrupoRepository";

export type IGrupoService = {
	createGrupo(data: ICreateGrupo): Promise<IGrupo>;
	getAllGrupos(): Promise<IGrupo[]>;
	getGrupoById(id: string): Promise<IGrupo | null>;
	updateGrupoById(params: UpdateGrupoParams): Promise<IGrupo>;
	deleteGrupoById(id: string): Promise<IGrupo>;
};
