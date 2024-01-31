import type { IPerfilPractica } from "./IPerfilPractica";
import type { ICreatePerfilPractica } from "./ICreatePerfilPractica";
import type { UpdatePerfilPracticaParams } from "./IPerfilPracticaRepository";

export type IPerfilPracticaService = {
	createPerfilPractica(data: ICreatePerfilPractica): Promise<IPerfilPractica>;
	getAllPerfilesPractica(): Promise<IPerfilPractica[]>;
	getPerfilPracticaById(id: string): Promise<IPerfilPractica | null>;
	updatePerfilPracticaById(
		params: UpdatePerfilPracticaParams,
	): Promise<IPerfilPractica>;
	deletePerfilPracticaById(id: string): Promise<IPerfilPractica>;
};
