import type { Alumno } from "@prisma/client";

import type { ICreateInscripcion } from "../../Inscripcion/Domain/ICreateInscripcion";

export type ICreateAlumno = Omit<
	Alumno,
	"id" | "createdAt" | "updatedAt" | "estado" | "usuarioId"
> &
	Omit<ICreateInscripcion, "alumnoId">;
