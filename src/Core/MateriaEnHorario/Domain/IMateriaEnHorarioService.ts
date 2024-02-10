import type { IMateriaEnHorario } from "./IMateriaEnHorario"
import type { ICreateMateriaEnHorario } from "./ICreateMateriaEnHorario"
import type { UpdateMateriaEnHorarioParams } from "./IMateriaEnHorarioRepository";

export type IMateriaEnHorarioService = {
  createMateriaEnHorario(data: ICreateMateriaEnHorario): Promise<IMateriaEnHorario>;
	getAllMateriaEnHorarios(): Promise<IMateriaEnHorario[]>;
	getMateriaEnHorarioById(id: string): Promise<IMateriaEnHorario | null>;
	updateMateriaEnHorarioById(params: UpdateMateriaEnHorarioParams): Promise<IMateriaEnHorario>;
	deleteMateriaEnHorarioById(id: string): Promise<IMateriaEnHorario>;
}