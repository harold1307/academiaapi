import type { INivelAcademico } from "./INivelAcademico"
import type { ICreateNivelAcademico } from "./ICreateNivelAcademico"
import type { IUpdateNivelAcademico } from "./IUpdateNivelAcademico";

export type UpdateNivelAcademicoParams = {
	id: string;
	data: IUpdateNivelAcademico;
}

export type INivelAcademicoRepository = {
  create(data: ICreateNivelAcademico): Promise<INivelAcademico>;
	getAll(): Promise<INivelAcademico[]>;
	getById(id: string): Promise<INivelAcademico | null>;
	update(params: UpdateNivelAcademicoParams): Promise<INivelAcademico>;
	deleteById(id: string): Promise<INivelAcademico>;
}