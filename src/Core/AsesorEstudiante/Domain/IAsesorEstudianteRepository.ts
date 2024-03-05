import type { IAsesorEstudiante } from "./IAsesorEstudiante"
import type { ICreateAsesorEstudiante } from "./ICreateAsesorEstudiante"
import type { IUpdateAsesorEstudiante } from "./IUpdateAsesorEstudiante";

export type UpdateAsesorEstudianteParams = {
	id: string;
	data: IUpdateAsesorEstudiante;
}

export type IAsesorEstudianteRepository = {
  create(data: ICreateAsesorEstudiante): Promise<IAsesorEstudiante>;
	getAll(): Promise<IAsesorEstudiante[]>;
	getById(id: string): Promise<IAsesorEstudiante | null>;
	update(params: UpdateAsesorEstudianteParams): Promise<IAsesorEstudiante>;
	deleteById(id: string): Promise<IAsesorEstudiante>;
}