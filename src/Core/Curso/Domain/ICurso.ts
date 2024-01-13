export interface ICurso {
	id: string;
	estado: boolean;
	nombre: string;
	certificado: string | null;
	alias: string | null;
	variantesCount: number;
}
