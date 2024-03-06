import type { IResponsableAsesorEstudiante } from "./IResponsableAsesorEstudiante"
import type { ICreateResponsableAsesorEstudiante } from "./ICreateResponsableAsesorEstudiante"
// import type { UpdateResponsableAsesorEstudianteParams } from "./IResponsableAsesorEstudianteRepository";

export type IResponsableAsesorEstudianteService = {
  createResponsableAsesorEstudiante(data: ICreateResponsableAsesorEstudiante): Promise<IResponsableAsesorEstudiante>;
	getAllResponsableAsesorEstudiantes(): Promise<IResponsableAsesorEstudiante[]>;
	getResponsableAsesorEstudianteById(id: string): Promise<IResponsableAsesorEstudiante | null>;
	// updateResponsableAsesorEstudianteById(params: UpdateResponsableAsesorEstudianteParams): Promise<IResponsableAsesorEstudiante>;
	deleteResponsableAsesorEstudianteById(id: string): Promise<IResponsableAsesorEstudiante>;
}