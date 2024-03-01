import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateUsuarioEnGrupo } from "../../Domain/ICreateUsuarioEnGrupo";
import type { IUsuarioEnGrupo } from "../../Domain/IUsuarioEnGrupo";
import type {
	DeleteUsuarioEnGrupoParams,
	IUsuarioEnGrupoRepository,
} from "../../Domain/IUsuarioEnGrupoRepository";

@injectable()
export class UsuarioEnGrupoRepository implements IUsuarioEnGrupoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	// getAll(): Promise<IUsuarioEnGrupo[]> {

	// }
	// getById(id: string): Promise<IUsuarioEnGrupo | null>{

	// }
	deleteById({
		grupoId,
		usuarioId,
	}: DeleteUsuarioEnGrupoParams): Promise<IUsuarioEnGrupo> {
		return this._client.usuarioEnGrupo.delete({
			where: {
				grupoId_usuarioId: {
					grupoId,
					usuarioId,
				},
			},
		});
	}

	create({
		grupoId,
		usuarioId,
	}: ICreateUsuarioEnGrupo): Promise<IUsuarioEnGrupo> {
		return this._client.usuarioEnGrupo.create({
			data: {
				grupo: { connect: { id: grupoId } },
				usuario: { connect: { id: usuarioId } },
			},
		});
	}
	// update(params: UpdateUsuarioEnGrupoParams): Promise<IUsuarioEnGrupo> {

	// }
}
