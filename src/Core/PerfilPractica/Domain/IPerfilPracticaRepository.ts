import type { IPerfilPractica } from "./IPerfilPractica"
import type { ICreatePerfilPractica } from "./ICreatePerfilPractica"
import type { IUpdatePerfilPractica } from "./IUpdatePerfilPractica";

export type UpdatePerfilPracticaParams = {
	id: string;
	data: IUpdatePerfilPractica;
}

export type IPerfilPracticaRepository = {
  create(data: ICreatePerfilPractica): Promise<IPerfilPractica>;
	getAll(): Promise<IPerfilPractica[]>;
	getById(id: string): Promise<IPerfilPractica | null>;
	update(params: UpdatePerfilPracticaParams): Promise<IPerfilPractica>;
	deleteById(id: string): Promise<IPerfilPractica>;
}