import { $Enums } from "@prisma/client";
import { z } from "zod";

import type { IInstitucion } from "../../Domain/IInstitucion";

export type IUpdateInstitucion = Partial<
	Omit<IInstitucion, "id" | "enUso" | "createdAt" | "updatedAt">
>;

const schema: z.ZodType<IUpdateInstitucion> = z.object({
	nombre: z.string().optional(),
	tipo: z.nativeEnum($Enums.TipoInstitucion).optional(),
	pais: z.string().optional(),
	provincia: z.string().optional(),
	canton: z.string().optional(),
	codigo: z.string().optional(),
});

export class UpdateInstitucionDTO {
	private nombre?: string;
	private tipo?: $Enums.TipoInstitucion;
	private pais?: string;
	private provincia?: string;
	private canton?: string;
	private codigo?: string;
	constructor({
		nombre,
		tipo,
		pais,
		provincia,
		canton,
		codigo,
	}: IUpdateInstitucion) {
		this.nombre = nombre;
		this.tipo = tipo;
		this.pais = pais;
		this.provincia = provincia;
		this.canton = canton;
		this.codigo = codigo;
	}

	validate() {
		return schema.safeParse(Object.fromEntries(Object.entries(this)));
	}
}
