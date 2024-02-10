import type { IMateriaEnHorario } from "./IMateriaEnHorario"
import type { ICreateMateriaEnHorario } from "./ICreateMateriaEnHorario"
import type { IUpdateMateriaEnHorario } from "./IUpdateMateriaEnHorario";

export type UpdateMateriaEnHorarioParams = {
	id: string;
	data: IUpdateMateriaEnHorario;
}

export type IMateriaEnHorarioRepository = {
  create(data: ICreateMateriaEnHorario): Promise<IMateriaEnHorario>;
	getAll(): Promise<IMateriaEnHorario[]>;
	getById(id: string): Promise<IMateriaEnHorario | null>;
	update(params: UpdateMateriaEnHorarioParams): Promise<IMateriaEnHorario>;
	deleteById(id: string): Promise<IMateriaEnHorario>;
}