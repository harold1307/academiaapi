import "reflect-metadata";

import type { PrismaClient } from "@prisma/client";
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
import type { IAsignaturaEnVarianteCursoRepository } from "../../Core/AsignaturaEnVarianteCurso/Domain/IAsignaturaEnVarianteCursoRepository";
import { AsignaturaEnVarianteCursoRepository } from "../../Core/AsignaturaEnVarianteCurso/Infrastructure/Repositories/AsignaturaEnVarianteCursoRepository";
import { CursoService } from "../../Core/Curso/Application/Service";
import type { ICursoRepository } from "../../Core/Curso/Domain/ICursoRepository";
import type { ICursoService } from "../../Core/Curso/Domain/ICursoService";
import { CursoRepository } from "../../Core/Curso/Infrastructure/Repositories/CursoRepository";
import type { IVarianteCursoRepository } from "../../Core/VarianteCurso/Domain/IVarianteCursoRepository";
import { VarianteCursoRepository } from "../../Core/VarianteCurso/Infrastructure/Repositories/VarianteCursoRepository";

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

// modalidad
import { ModalidadService } from "../../Core/Modalidad/Application/Service";
import type { IModalidadRepository } from "../../Core/Modalidad/Domain/IModalidadRepository";
import type { IModalidadService } from "../../Core/Modalidad/Domain/IModalidadService";
import { ModalidadRepository } from "../../Core/Modalidad/Infrastructure/Repositories/ModalidadRepository";

// curso escuela
import { CursoEscuelaService } from "../../Core/CursoEscuela/Application/Service";
import type { ICursoEscuelaRepository } from "../../Core/CursoEscuela/Domain/ICursoEscuelaRepository";
import type { ICursoEscuelaService } from "../../Core/CursoEscuela/Domain/ICursoEscuelaService";
import { CursoEscuelaRepository } from "../../Core/CursoEscuela/Infrastructure/Repositories/CursoEscuelaRepository";

// paralelo
import { ParaleloService } from "../../Core/Paralelo/Application/Service";
import type { IParaleloRepository } from "../../Core/Paralelo/Domain/IParaleloRepository";
import type { IParaleloService } from "../../Core/Paralelo/Domain/IParaleloService";
import { ParaleloRepository } from "../../Core/Paralelo/Infrastructure/Repositories/ParaleloRepository";

// sesiones
import { SesionService } from "../../Core/Sesion/Application/Service";
import type { ISesionRepository } from "../../Core/Sesion/Domain/ISesionRepository";
import type { ISesionService } from "../../Core/Sesion/Domain/ISesionService";
import { SesionRepository } from "../../Core/Sesion/Infrastructure/Repositories/SesionRepository";

// turnos
import { TurnoService } from "../../Core/Turno/Application/Service";
import type { ITurnoRepository } from "../../Core/Turno/Domain/ITurnoRepository";
import type { ITurnoService } from "../../Core/Turno/Domain/ITurnoService";
import { TurnoRepository } from "../../Core/Turno/Infrastructure/Repositories/TurnoRepository";

// asignaturas en curso escuela
import { AsignaturaEnCursoEscuelaService } from "../../Core/AsignaturaEnCursoEscuela/Application/Service";
import type { IAsignaturaEnCursoEscuelaRepository } from "../../Core/AsignaturaEnCursoEscuela/Domain/IAsignaturaEnCursoEscuelaRepository";
import type { IAsignaturaEnCursoEscuelaService } from "../../Core/AsignaturaEnCursoEscuela/Domain/IAsignaturaEnCursoEscuelaService";
import { AsignaturaEnCursoEscuelaRepository } from "../../Core/AsignaturaEnCursoEscuela/Infrastructure/Repositories/AsignaturaEnCursoEscuelaRepository";

// alternativas de evaluacion
import { AlternativaEvaluacionService } from "../../Core/AlternativaEvaluacion/Application/Service";
import type { IAlternativaEvaluacionRepository } from "../../Core/AlternativaEvaluacion/Domain/IAlternativaEvaluacionRepository";
import type { IAlternativaEvaluacionService } from "../../Core/AlternativaEvaluacion/Domain/IAlternativaEvaluacionService";
import { AlternativaEvaluacionRepository } from "../../Core/AlternativaEvaluacion/Infrastructure/Repositories/AlternativaEvaluacionRepository";

// modelos evaluativos
import { ModeloEvaluativoService } from "../../Core/ModeloEvaluativo/Application/Service";
import type { IModeloEvaluativoRepository } from "../../Core/ModeloEvaluativo/Domain/IModeloEvaluativoRepository";
import type { IModeloEvaluativoService } from "../../Core/ModeloEvaluativo/Domain/IModeloEvaluativoService";
import { ModeloEvaluativoRepository } from "../../Core/ModeloEvaluativo/Infrastructure/Repositories/ModeloEvaluativoRepository";

import { AsignaturaEnVarianteCursoService } from "../../Core/AsignaturaEnVarianteCurso/Application/Service";
import type { IAsignaturaEnVarianteCursoService } from "../../Core/AsignaturaEnVarianteCurso/Domain/IAsignaturaEnVarianteCursoService";
import { VarianteCursoService } from "../../Core/VarianteCurso/Application/Service";
import type { IVarianteCursoService } from "../../Core/VarianteCurso/Domain/IVarianteCursoService";
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
StartupBuilder.bind<IVarianteCursoRepository>(TYPES.VarianteCursoRepository)
	.to(VarianteCursoRepository)
	.inSingletonScope();
StartupBuilder.bind<IVarianteCursoService>(TYPES.VarianteCursoService)
	.to(VarianteCursoService)
	.inSingletonScope();
StartupBuilder.bind<IAsignaturaEnVarianteCursoRepository>(
	TYPES.AsignaturaEnVarianteCursoRepository,
)
	.to(AsignaturaEnVarianteCursoRepository)
	.inSingletonScope();
StartupBuilder.bind<IAsignaturaEnVarianteCursoService>(
	TYPES.AsignaturaEnVarianteCursoService,
)
	.to(AsignaturaEnVarianteCursoService)
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

// modalidad
StartupBuilder.bind<IModalidadRepository>(TYPES.ModalidadRepository)
	.to(ModalidadRepository)
	.inSingletonScope();
StartupBuilder.bind<IModalidadService>(TYPES.ModalidadService)
	.to(ModalidadService)
	.inSingletonScope();

// curso escuela
StartupBuilder.bind<ICursoEscuelaRepository>(TYPES.CursoEscuelaRepository)
	.to(CursoEscuelaRepository)
	.inSingletonScope();
StartupBuilder.bind<ICursoEscuelaService>(TYPES.CursoEscuelaService)
	.to(CursoEscuelaService)
	.inSingletonScope();

// paralelos
StartupBuilder.bind<IParaleloRepository>(TYPES.ParaleloRepository)
	.to(ParaleloRepository)
	.inSingletonScope();
StartupBuilder.bind<IParaleloService>(TYPES.ParaleloService)
	.to(ParaleloService)
	.inSingletonScope();

// sesiones
StartupBuilder.bind<ISesionRepository>(TYPES.SesionRepository)
	.to(SesionRepository)
	.inSingletonScope();
StartupBuilder.bind<ISesionService>(TYPES.SesionService)
	.to(SesionService)
	.inSingletonScope();

// turnos
StartupBuilder.bind<ITurnoRepository>(TYPES.TurnoRepository)
	.to(TurnoRepository)
	.inSingletonScope();
StartupBuilder.bind<ITurnoService>(TYPES.TurnoService)
	.to(TurnoService)
	.inSingletonScope();

// asignaturas en curso escuela
StartupBuilder.bind<IAsignaturaEnCursoEscuelaRepository>(
	TYPES.AsignaturaEnCursoEscuelaRepository,
)
	.to(AsignaturaEnCursoEscuelaRepository)
	.inSingletonScope();
StartupBuilder.bind<IAsignaturaEnCursoEscuelaService>(
	TYPES.AsignaturaEnCursoEscuelaService,
)
	.to(AsignaturaEnCursoEscuelaService)
	.inSingletonScope();

// alternativas de evaluacion
StartupBuilder.bind<IAlternativaEvaluacionRepository>(
	TYPES.AlternativaEvaluacionRepository,
)
	.to(AlternativaEvaluacionRepository)
	.inSingletonScope();
StartupBuilder.bind<IAlternativaEvaluacionService>(
	TYPES.AlternativaEvaluacionService,
)
	.to(AlternativaEvaluacionService)
	.inSingletonScope();

// modelos evaluativos
StartupBuilder.bind<IModeloEvaluativoRepository>(
	TYPES.ModeloEvaluativoRepository,
)
	.to(ModeloEvaluativoRepository)
	.inSingletonScope();
StartupBuilder.bind<IModeloEvaluativoService>(TYPES.ModeloEvaluativoService)
	.to(ModeloEvaluativoService)
	.inSingletonScope();

export { StartupBuilder };
