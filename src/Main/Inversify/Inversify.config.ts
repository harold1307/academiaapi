import "reflect-metadata";

import { type PrismaClient } from "@prisma/client";
import { Container } from "inversify";

// Institucion
import { InstitucionService } from "../../Core/Institucion/Application/Service";
import type { IInstitucionRepository } from "../../Core/Institucion/Domain/IInstitucionRepository";
import type { IInstitucionService } from "../../Core/Institucion/Domain/IInstitucionService";
import { InstitucionRepository } from "../../Core/Institucion/Infraestructure/Repositories/InstitucionRepository";
// Malla Curricular
import { MallaCurricularService } from "../../Core/MallaCurricular/Application/Service";
import type { ILugarEjecucionRepository } from "../../Core/MallaCurricular/Domain/ILugarEjecucionRepository";
import type { IMallaCurricularRepository } from "../../Core/MallaCurricular/Domain/IMallaCurricularRepository";
import type { IMallaCurricularService } from "../../Core/MallaCurricular/Domain/IMallaCurricularService";
import { LugarEjecucionRepository } from "../../Core/MallaCurricular/Infraestructure/Repositories/LugarEjecucionRepository";
import { MallaCurricularRepository } from "../../Core/MallaCurricular/Infraestructure/Repositories/MallaCurricularRepository";

// Asignatura
import { AsignaturaService } from "../../Core/Asignatura/Application/Service";
import type { IAsignaturaRepository } from "../../Core/Asignatura/Domain/IAsignaturaRepository";
import type { IAsignaturaService } from "../../Core/Asignatura/Domain/IAsignaturaService";
import { AsignaturaRepository } from "../../Core/Asignatura/Infrastructure/Repositories/AsignaturaRepository";

// curso
import { CursoService } from "../../Core/Curso/Application/Service";
import type { ICursoRepository } from "../../Core/Curso/Domain/ICursoRepository";
import type { ICursoService } from "../../Core/Curso/Domain/ICursoService";
import { CursoRepository } from "../../Core/Curso/Infrastructure/Repositories/CursoRepository";

// competencia
import { CompetenciaService } from "../../Core/Competencia/Application/Service";
import type { ICompetenciaRepository } from "../../Core/Competencia/Domain/ICompetenciaRepository";
import type { ICompetenciaService } from "../../Core/Competencia/Domain/ICompetenciaService";
import { CompetenciaRepository } from "../../Core/Competencia/Infrastructure/Repositories/CompetenciaRepository";

// asignatura en malla
import { AsignaturaEnMallaService } from "../../Core/AsignaturaEnMalla/Application/Service";
import type { IAsignaturaEnMallaRepository } from "../../Core/AsignaturaEnMalla/Domain/IAsignaturaEnMallaRepository";
import type { IAsignaturaEnMallaService } from "../../Core/AsignaturaEnMalla/Domain/IAsignaturaEnMallaService";
import { AsignaturaEnMallaRepository } from "../../Core/AsignaturaEnMalla/Infrastructure/Repositories/AsignaturaEnMallaRepository";

// eje formativo
import { EjeFormativoService } from "../../Core/EjeFormativo/Application/Service";
import type { IEjeFormativoRepository } from "../../Core/EjeFormativo/Domain/IEjeFormativoRepository";
import type { IEjeFormativoService } from "../../Core/EjeFormativo/Domain/IEjeFormativoService";
import { EjeFormativoRepository } from "../../Core/EjeFormativo/Infrastructure/Repositories/EjeFormativoRepository";

// campo formacion
import { CampoFormacionService } from "../../Core/CampoFormacion/Application/Service";
import type { ICampoFormacionRepository } from "../../Core/CampoFormacion/Domain/ICampoFormacionRepository";
import type { ICampoFormacionService } from "../../Core/CampoFormacion/Domain/ICampoFormacionService";
import { CampoFormacionRepository } from "../../Core/CampoFormacion/Infrastructure/Repositories/CampoFormacionRepository";

//area conocimiento
import { AreaConocimientoService } from "../../Core/AreaConocimiento/Application/Service";
import type { IAreaConocimientoRepository } from "../../Core/AreaConocimiento/Domain/IAreaConocimientoRepository";
import type { IAreaConocimientoService } from "../../Core/AreaConocimiento/Domain/IAreaConocimientoService";
import { AreaConocimientoRepository } from "../../Core/AreaConocimiento/Infrastructure/Repositories/AreaConocimientoRepository";

import { Prisma } from "../Prisma/PrismaClient";
import { TYPES } from "./types";

const StartupBuilder = new Container();

// prisma
StartupBuilder.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(Prisma);

// institucion
StartupBuilder.bind<IInstitucionRepository>(TYPES.InstitucionRepository)
	.to(InstitucionRepository)
	.inSingletonScope();
StartupBuilder.bind<IInstitucionService>(TYPES.InstitucionService)
	.to(InstitucionService)
	.inSingletonScope();

// malla curricular
StartupBuilder.bind<IMallaCurricularRepository>(TYPES.MallaCurricularRepository)
	.to(MallaCurricularRepository)
	.inSingletonScope();
StartupBuilder.bind<IMallaCurricularService>(TYPES.MallaCurricularService)
	.to(MallaCurricularService)
	.inSingletonScope();
StartupBuilder.bind<ILugarEjecucionRepository>(TYPES.LugarEjecucionRepository)
	.to(LugarEjecucionRepository)
	.inSingletonScope();

// asignatura
StartupBuilder.bind<IAsignaturaRepository>(TYPES.AsignaturaRepository)
	.to(AsignaturaRepository)
	.inSingletonScope();
StartupBuilder.bind<IAsignaturaService>(TYPES.AsignaturaService)
	.to(AsignaturaService)
	.inSingletonScope();

// curso
StartupBuilder.bind<ICursoRepository>(TYPES.CursoRepository)
	.to(CursoRepository)
	.inSingletonScope();
StartupBuilder.bind<ICursoService>(TYPES.CursoService)
	.to(CursoService)
	.inSingletonScope();

// competencia
StartupBuilder.bind<ICompetenciaRepository>(TYPES.CompetenciaRepository)
	.to(CompetenciaRepository)
	.inSingletonScope();
StartupBuilder.bind<ICompetenciaService>(TYPES.CompetenciaService)
	.to(CompetenciaService)
	.inSingletonScope();

// asignatura en malla
StartupBuilder.bind<IAsignaturaEnMallaRepository>(
	TYPES.AsignaturaEnMallaRepository,
)
	.to(AsignaturaEnMallaRepository)
	.inSingletonScope();
StartupBuilder.bind<IAsignaturaEnMallaService>(TYPES.AsignaturaEnMallaService)
	.to(AsignaturaEnMallaService)
	.inSingletonScope();

// eje formativo
StartupBuilder.bind<IEjeFormativoRepository>(TYPES.EjeFormativoRepository)
	.to(EjeFormativoRepository)
	.inSingletonScope();
StartupBuilder.bind<IEjeFormativoService>(TYPES.EjeFormativoService)
	.to(EjeFormativoService)
	.inSingletonScope();

// campo formacion
StartupBuilder.bind<ICampoFormacionRepository>(TYPES.CampoFormacionRepository)
	.to(CampoFormacionRepository)
	.inSingletonScope();
StartupBuilder.bind<ICampoFormacionService>(TYPES.CampoFormacionService)
	.to(CampoFormacionService)
	.inSingletonScope();

// area conocimiento
StartupBuilder.bind<IAreaConocimientoRepository>(
	TYPES.AreaConocimientoRepository,
)
	.to(AreaConocimientoRepository)
	.inSingletonScope();
StartupBuilder.bind<IAreaConocimientoService>(TYPES.AreaConocimientoService)
	.to(AreaConocimientoService)
	.inSingletonScope();

export { StartupBuilder };
