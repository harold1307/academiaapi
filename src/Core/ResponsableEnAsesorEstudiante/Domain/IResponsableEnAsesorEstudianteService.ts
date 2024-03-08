import type { ICreateResponsableEnAsesorEstudiante } from "./ICreateResponsableEnAsesorEstudiante";
import type { IResponsableEnAsesorEstudiante } from "./IResponsableEnAsesorEstudiante";

export type IResponsableEnAsesorEstudianteService = {
	createResponsableEnAsesorEstudiante(
		data: ICreateResponsableEnAsesorEstudiante,
	): Promise<IResponsableEnAsesorEstudiante>;
	// getAllResponsableEnAsesorEstudiantes(): Promise<
	// 	IResponsableEnAsesorEstudiante[]
	// >;
	getResponsableEnAsesorEstudianteById(
		id: string,
	): Promise<IResponsableEnAsesorEstudiante | null>;
	// updateResponsableEnAsesorEstudianteById(params: UpdateResponsableEnAsesorEstudianteParams): Promise<IResponsableEnAsesorEstudiante>;
	deleteResponsableEnAsesorEstudianteById(
		id: string,
	): Promise<IResponsableEnAsesorEstudiante>;
};
