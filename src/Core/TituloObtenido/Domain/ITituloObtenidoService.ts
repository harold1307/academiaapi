import type { ICreateTituloObtenido } from "./ICreateTituloObtenido";
import type { ITituloObtenido } from "./ITituloObtenido";
import type { UpdateTituloObtenidoParams } from "./ITituloObtenidoRepository";

export type ITituloObtenidoService = {
	createTituloObtenido(data: ICreateTituloObtenido): Promise<ITituloObtenido>;
	getAllTitulosObtenidos(): Promise<ITituloObtenido[]>;
	getTituloObtenidoById(id: string): Promise<ITituloObtenido | null>;
	updateTituloObtenidoById(
		params: UpdateTituloObtenidoParams,
	): Promise<ITituloObtenido>;
	deleteTituloObtenidoById(id: string): Promise<ITituloObtenido>;
};
