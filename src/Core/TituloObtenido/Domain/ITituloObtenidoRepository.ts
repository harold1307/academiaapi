import type { ITituloObtenido } from "./ITituloObtenido"
import type { ICreateTituloObtenido } from "./ICreateTituloObtenido"
import type { IUpdateTituloObtenido } from "./IUpdateTituloObtenido";

export type UpdateTituloObtenidoParams = {
	id: string;
	data: IUpdateTituloObtenido;
}

export type ITituloObtenidoRepository = {
  create(data: ICreateTituloObtenido): Promise<ITituloObtenido>;
	getAll(): Promise<ITituloObtenido[]>;
	getById(id: string): Promise<ITituloObtenido | null>;
	update(params: UpdateTituloObtenidoParams): Promise<ITituloObtenido>;
	deleteById(id: string): Promise<ITituloObtenido>;
}