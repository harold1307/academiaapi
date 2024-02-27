import type { Coordinacion } from "@prisma/client";
import type { IPrograma } from "../../Programa/Domain/IPrograma";

export type ICoordinacion = Coordinacion & {
	enUso: boolean;
	programas: IPrograma[];
	profesores: number;
};
