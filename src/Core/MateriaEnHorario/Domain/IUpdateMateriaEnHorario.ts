import type { ICreateMateriaEnHorario } from "./ICreateMateriaEnHorario";

export type IUpdateMateriaEnHorario = Partial<
	Omit<ICreateMateriaEnHorario, "nivelAcademicoId" | "materiaId">
>;
