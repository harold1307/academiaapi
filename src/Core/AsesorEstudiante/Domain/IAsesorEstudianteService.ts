import type { IAsesorEstudiante } from "./IAsesorEstudiante";
import type { ICreateAsesorEstudiante } from "./ICreateAsesorEstudiante";
import type { UpdateAsesorEstudianteParams } from "./IAsesorEstudianteRepository";

export type IAsesorEstudianteService = {
	createAsesorEstudiante(
		data: ICreateAsesorEstudiante,
	): Promise<IAsesorEstudiante>;
	getAllAsesorEstudiantes(): Promise<IAsesorEstudiante[]>;
	getAsesorEstudianteById(id: string): Promise<IAsesorEstudiante | null>;
	updateAsesorEstudianteById(
		params: UpdateAsesorEstudianteParams,
	): Promise<IAsesorEstudiante>;
	deleteAsesorEstudianteById(id: string): Promise<IAsesorEstudiante>;
};
