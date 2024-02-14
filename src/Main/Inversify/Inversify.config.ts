import "reflect-metadata";

import type { PrismaClient } from "@prisma/client";
import { Container } from "inversify";

// sede
import { SedeService } from "../../Core/Sede/Application/Service";
import type { ISedeRepository } from "../../Core/Sede/Domain/ISedeRepository";
import type { ISedeService } from "../../Core/Sede/Domain/ISedeService";
import { SedeRepository } from "../../Core/Sede/Infraestructure/Repositories/SedeRepository";

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

// campos de modelos evaluativos
import { CampoModeloEvaluativoService } from "../../Core/CampoModeloEvaluativo/Application/Service";
import type { ICampoModeloEvaluativoRepository } from "../../Core/CampoModeloEvaluativo/Domain/ICampoModeloEvaluativoRepository";
import type { ICampoModeloEvaluativoService } from "../../Core/CampoModeloEvaluativo/Domain/ICampoModeloEvaluativoService";
import { CampoModeloEvaluativoRepository } from "../../Core/CampoModeloEvaluativo/Infrastructure/Repositories/CampoModeloEvaluativoRepository";

// modelos nivelacion
import { ModeloNivelacionService } from "../../Core/ModeloNivelacion/Application/Service";
import type { IModeloNivelacionRepository } from "../../Core/ModeloNivelacion/Domain/IModeloNivelacionRepository";
import type { IModeloNivelacionService } from "../../Core/ModeloNivelacion/Domain/IModeloNivelacionService";
import { ModeloNivelacionRepository } from "../../Core/ModeloNivelacion/Infrastructure/Repositories/ModeloNivelacionRepository";

// proyectos integradores
import { ProyectoIntegradorService } from "../../Core/ProyectoIntegrador/Application/Service";
import type { IProyectoIntegradorRepository } from "../../Core/ProyectoIntegrador/Domain/IProyectoIntegradorRepository";
import type { IProyectoIntegradorService } from "../../Core/ProyectoIntegrador/Domain/IProyectoIntegradorService";
import { ProyectoIntegradorRepository } from "../../Core/ProyectoIntegrador/Infrastructure/Repositories/ProyectoIntegradorRepository";

// campos en proyectos integradores
import { CampoProyectoIntegradorService } from "../../Core/CampoProyectoIntegrador/Application/Service";
import type { ICampoProyectoIntegradorRepository } from "../../Core/CampoProyectoIntegrador/Domain/ICampoProyectoIntegradorRepository";
import type { ICampoProyectoIntegradorService } from "../../Core/CampoProyectoIntegrador/Domain/ICampoProyectoIntegradorService";
import { CampoProyectoIntegradorRepository } from "../../Core/CampoProyectoIntegrador/Infrastructure/Repositories/CampoProyectoIntegradorRepository";

// niveles de titulacion
import { NivelTitulacionService } from "../../Core/NivelTitulacion/Application/Service";
import type { INivelTitulacionRepository } from "../../Core/NivelTitulacion/Domain/INivelTitulacionRepository";
import type { INivelTitulacionService } from "../../Core/NivelTitulacion/Domain/INivelTitulacionService";
import { NivelTitulacionRepository } from "../../Core/NivelTitulacion/Infrastructure/Repositories/NivelTitulacionRepository";

// detalles de nivel de titulacion
import { DetalleNivelTitulacionService } from "../../Core/DetalleNivelTitulacion/Application/Service";
import type { IDetalleNivelTitulacionRepository } from "../../Core/DetalleNivelTitulacion/Domain/IDetalleNivelTitulacionRepository";
import type { IDetalleNivelTitulacionService } from "../../Core/DetalleNivelTitulacion/Domain/IDetalleNivelTitulacionService";
import { DetalleNivelTitulacionRepository } from "../../Core/DetalleNivelTitulacion/Infrastructure/Repositories/DetalleNivelTitulacionRepository";

// perfiles de practica
import { PerfilPracticaService } from "../../Core/PerfilPractica/Application/Service";
import type { IPerfilPracticaRepository } from "../../Core/PerfilPractica/Domain/IPerfilPracticaRepository";
import type { IPerfilPracticaService } from "../../Core/PerfilPractica/Domain/IPerfilPracticaService";
import { PerfilPracticaRepository } from "../../Core/PerfilPractica/Infrastructure/Repositories/PerfilPracticaRepository";

// tipos de documento
import { TipoDocumentoService } from "../../Core/TipoDocumento/Application/Service";
import type { ITipoDocumentoRepository } from "../../Core/TipoDocumento/Domain/ITipoDocumentoRepository";
import type { ITipoDocumentoService } from "../../Core/TipoDocumento/Domain/ITipoDocumentoService";
import { TipoDocumentoRepository } from "../../Core/TipoDocumento/Infrastructure/Repositories/TipoDocumentoRepository";

// titulos obtenidos
import { TituloObtenidoService } from "../../Core/TituloObtenido/Application/Service";
import type { ITituloObtenidoRepository } from "../../Core/TituloObtenido/Domain/ITituloObtenidoRepository";
import type { ITituloObtenidoService } from "../../Core/TituloObtenido/Domain/ITituloObtenidoService";
import { TituloObtenidoRepository } from "../../Core/TituloObtenido/Infrastructure/Repositories/TituloObtenidoRepository";

// tipos de documento en programas
import { TipoDocumentoEnProgramaService } from "../../Core/TipoDocumentoEnPrograma/Application/Service";
import type { ITipoDocumentoEnProgramaRepository } from "../../Core/TipoDocumentoEnPrograma/Domain/ITipoDocumentoEnProgramaRepository";
import type { ITipoDocumentoEnProgramaService } from "../../Core/TipoDocumentoEnPrograma/Domain/ITipoDocumentoEnProgramaService";
import { TipoDocumentoEnProgramaRepository } from "../../Core/TipoDocumentoEnPrograma/Infrastructure/Repositories/TipoDocumentoEnProgramaRepository";

// programas
import { ProgramaService } from "../../Core/Programa/Application/Service";
import type { IProgramaRepository } from "../../Core/Programa/Domain/IProgramaRepository";
import type { IProgramaService } from "../../Core/Programa/Domain/IProgramaService";
import { ProgramaRepository } from "../../Core/Programa/Infrastructure/Repositories/ProgramaRepository";

// coordinaciones
import { CoordinacionService } from "../../Core/Coordinacion/Application/Service";
import type { ICoordinacionRepository } from "../../Core/Coordinacion/Domain/ICoordinacionRepository";
import type { ICoordinacionService } from "../../Core/Coordinacion/Domain/ICoordinacionService";
import { CoordinacionRepository } from "../../Core/Coordinacion/Infrastructure/Repositories/CoordinacionRepository";

// niveles de malla
import { NivelMallaService } from "../../Core/NivelMalla/Application/Service";
import type { INivelMallaRepository } from "../../Core/NivelMalla/Domain/INivelMallaRepository";
import type { INivelMallaService } from "../../Core/NivelMalla/Domain/INivelMallaService";
import { NivelMallaRepository } from "../../Core/NivelMalla/Infrastructure/Repositories/NivelMallaRepository";

// asignaturas en niveles de malla
import { AsignaturaEnNivelMallaService } from "../../Core/AsignaturaEnNivelMalla/Application/Service";
import type { IAsignaturaEnNivelMallaRepository } from "../../Core/AsignaturaEnNivelMalla/Domain/IAsignaturaEnNivelMallaRepository";
import type { IAsignaturaEnNivelMallaService } from "../../Core/AsignaturaEnNivelMalla/Domain/IAsignaturaEnNivelMallaService";
import { AsignaturaEnNivelMallaRepository } from "../../Core/AsignaturaEnNivelMalla/Infrastructure/Repositories/AsignaturaEnNivelMallaRepository";

// asignaturas modulo en malla
import { AsignaturaModuloEnMallaService } from "../../Core/AsignaturaModuloEnMalla/Application/Service";
import type { IAsignaturaModuloEnMallaRepository } from "../../Core/AsignaturaModuloEnMalla/Domain/IAsignaturaModuloEnMallaRepository";
import type { IAsignaturaModuloEnMallaService } from "../../Core/AsignaturaModuloEnMalla/Domain/IAsignaturaModuloEnMallaService";
import { AsignaturaModuloEnMallaRepository } from "../../Core/AsignaturaModuloEnMalla/Infrastructure/Repositories/AsignaturaModuloEnMallaRepository";

// practicas comunitarias en malla
import { PracticaComunitariaEnMallaService } from "../../Core/PracticaComunitariaEnMalla/Application/Service";
import type { IPracticaComunitariaEnMallaRepository } from "../../Core/PracticaComunitariaEnMalla/Domain/IPracticaComunitariaEnMallaRepository";
import type { IPracticaComunitariaEnMallaService } from "../../Core/PracticaComunitariaEnMalla/Domain/IPracticaComunitariaEnMallaService";
import { PracticaComunitariaEnMallaRepository } from "../../Core/PracticaComunitariaEnMalla/Infrastructure/Repositories/PracticaComunitariaEnMallaRepository";

// practicas pre profesionales en malla
import { PracticaPreProfesionalEnMallaService } from "../../Core/PracticaPreProfesionalEnMalla/Application/Service";
import type { IPracticaPreProfesionalEnMallaRepository } from "../../Core/PracticaPreProfesionalEnMalla/Domain/IPracticaPreProfesionalEnMallaRepository";
import type { IPracticaPreProfesionalEnMallaService } from "../../Core/PracticaPreProfesionalEnMalla/Domain/IPracticaPreProfesionalEnMallaService";
import { PracticaPreProfesionalEnMallaRepository } from "../../Core/PracticaPreProfesionalEnMalla/Infrastructure/Repositories/PracticaPreProfesionalEnMallaRepository";

// niveles academicos
import { NivelAcademicoService } from "../../Core/NivelAcademico/Application/Service";
import type { INivelAcademicoRepository } from "../../Core/NivelAcademico/Domain/INivelAcademicoRepository";
import type { INivelAcademicoService } from "../../Core/NivelAcademico/Domain/INivelAcademicoService";
import { NivelAcademicoRepository } from "../../Core/NivelAcademico/Infrastructure/Repositories/NivelAcademicoRepository";

// materias en niveles academicos
import { MateriaEnNivelAcademicoService } from "../../Core/MateriaEnNivelAcademico/Application/Service";
import type { IMateriaEnNivelAcademicoRepository } from "../../Core/MateriaEnNivelAcademico/Domain/IMateriaEnNivelAcademicoRepository";
import type { IMateriaEnNivelAcademicoService } from "../../Core/MateriaEnNivelAcademico/Domain/IMateriaEnNivelAcademicoService";
import { MateriaEnNivelAcademicoRepository } from "../../Core/MateriaEnNivelAcademico/Infrastructure/Repositories/MateriaEnNivelAcademicoRepository";

// materias en horario
import { MateriaEnHorarioService } from "../../Core/MateriaEnHorario/Application/Service";
import type { IMateriaEnHorarioRepository } from "../../Core/MateriaEnHorario/Domain/IMateriaEnHorarioRepository";
import type { IMateriaEnHorarioService } from "../../Core/MateriaEnHorario/Domain/IMateriaEnHorarioService";
import { MateriaEnHorarioRepository } from "../../Core/MateriaEnHorario/Infrastructure/Repositories/MateriaEnHorarioRepository";

// ubicaciones
import { UbicacionService } from "../../Core/Ubicacion/Application/Service";
import type { IUbicacionRepository } from "../../Core/Ubicacion/Domain/IUbicacionRepository";
import type { IUbicacionService } from "../../Core/Ubicacion/Domain/IUbicacionService";
import { UbicacionRepository } from "../../Core/Ubicacion/Infrastructure/Repositories/UbicacionRepository";

// periodos lectivos
import { PeriodoLectivoService } from "../../Core/PeriodoLectivo/Application/Service";
import type { IPeriodoLectivoRepository } from "../../Core/PeriodoLectivo/Domain/IPeriodoLectivoRepository";
import type { IPeriodoLectivoService } from "../../Core/PeriodoLectivo/Domain/IPeriodoLectivoService";
import { PeriodoLectivoRepository } from "../../Core/PeriodoLectivo/Infrastructure/Repositories/PeriodoLectivoRepository";

// cortes
import { CorteService } from "../../Core/Corte/Application/Service";
import type { ICorteRepository } from "../../Core/Corte/Domain/ICorteRepository";
import type { ICorteService } from "../../Core/Corte/Domain/ICorteService";
import { CorteRepository } from "../../Core/Corte/Infrastructure/Repositories/CorteRepository";

// calculos de costo
import { CalculoCostoService } from "../../Core/CalculoCosto/Application/Service";
import type { ICalculoCostoRepository } from "../../Core/CalculoCosto/Domain/ICalculoCostoRepository";
import type { ICalculoCostoService } from "../../Core/CalculoCosto/Domain/ICalculoCostoService";
import { CalculoCostoRepository } from "../../Core/CalculoCosto/Infrastructure/Repositories/CalculoCostoRepository";

import { AsignaturaEnVarianteCursoService } from "../../Core/AsignaturaEnVarianteCurso/Application/Service";
import type { IAsignaturaEnVarianteCursoService } from "../../Core/AsignaturaEnVarianteCurso/Domain/IAsignaturaEnVarianteCursoService";
import { VarianteCursoService } from "../../Core/VarianteCurso/Application/Service";
import type { IVarianteCursoService } from "../../Core/VarianteCurso/Domain/IVarianteCursoService";
import { Prisma } from "../Prisma/PrismaClient";
import { TYPES } from "./types";

const StartupBuilder = new Container();

// prisma
StartupBuilder.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(Prisma);

// sedes
StartupBuilder.bind<ISedeRepository>(TYPES.SedeRepository)
	.to(SedeRepository)
	.inSingletonScope();
StartupBuilder.bind<ISedeService>(TYPES.SedeService)
	.to(SedeService)
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

// campos de modelos evaluativos
StartupBuilder.bind<ICampoModeloEvaluativoRepository>(
	TYPES.CampoModeloEvaluativoRepository,
)
	.to(CampoModeloEvaluativoRepository)
	.inSingletonScope();
StartupBuilder.bind<ICampoModeloEvaluativoService>(
	TYPES.CampoModeloEvaluativoService,
)
	.to(CampoModeloEvaluativoService)
	.inSingletonScope();

// modelos nivelacion
StartupBuilder.bind<IModeloNivelacionRepository>(
	TYPES.ModeloNivelacionRepository,
)
	.to(ModeloNivelacionRepository)
	.inSingletonScope();
StartupBuilder.bind<IModeloNivelacionService>(TYPES.ModeloNivelacionService)
	.to(ModeloNivelacionService)
	.inSingletonScope();

// proyectos integradores
StartupBuilder.bind<IProyectoIntegradorRepository>(
	TYPES.ProyectoIntegradorRepository,
)
	.to(ProyectoIntegradorRepository)
	.inSingletonScope();
StartupBuilder.bind<IProyectoIntegradorService>(TYPES.ProyectoIntegradorService)
	.to(ProyectoIntegradorService)
	.inSingletonScope();

// campos en proyectos integradores
StartupBuilder.bind<ICampoProyectoIntegradorRepository>(
	TYPES.CampoProyectoIntegradorRepository,
)
	.to(CampoProyectoIntegradorRepository)
	.inSingletonScope();
StartupBuilder.bind<ICampoProyectoIntegradorService>(
	TYPES.CampoProyectoIntegradorService,
)
	.to(CampoProyectoIntegradorService)
	.inSingletonScope();

// niveles de titulacion
StartupBuilder.bind<INivelTitulacionRepository>(TYPES.NivelTitulacionRepository)
	.to(NivelTitulacionRepository)
	.inSingletonScope();
StartupBuilder.bind<INivelTitulacionService>(TYPES.NivelTitulacionService)
	.to(NivelTitulacionService)
	.inSingletonScope();

// detalles de nivel de titulacion
StartupBuilder.bind<IDetalleNivelTitulacionRepository>(
	TYPES.DetalleNivelTitulacionRepository,
)
	.to(DetalleNivelTitulacionRepository)
	.inSingletonScope();
StartupBuilder.bind<IDetalleNivelTitulacionService>(
	TYPES.DetalleNivelTitulacionService,
)
	.to(DetalleNivelTitulacionService)
	.inSingletonScope();

// perfiles de practica
StartupBuilder.bind<IPerfilPracticaRepository>(TYPES.PerfilPracticaRepository)
	.to(PerfilPracticaRepository)
	.inSingletonScope();
StartupBuilder.bind<IPerfilPracticaService>(TYPES.PerfilPracticaService)
	.to(PerfilPracticaService)
	.inSingletonScope();

// tipos de documento
StartupBuilder.bind<ITipoDocumentoRepository>(TYPES.TipoDocumentoRepository)
	.to(TipoDocumentoRepository)
	.inSingletonScope();
StartupBuilder.bind<ITipoDocumentoService>(TYPES.TipoDocumentoService)
	.to(TipoDocumentoService)
	.inSingletonScope();

// titulos obtenidos
StartupBuilder.bind<ITituloObtenidoRepository>(TYPES.TituloObtenidoRepository)
	.to(TituloObtenidoRepository)
	.inSingletonScope();
StartupBuilder.bind<ITituloObtenidoService>(TYPES.TituloObtenidoService)
	.to(TituloObtenidoService)
	.inSingletonScope();

// tipos de documento en programas
StartupBuilder.bind<ITipoDocumentoEnProgramaRepository>(
	TYPES.TipoDocumentoEnProgramaRepository,
)
	.to(TipoDocumentoEnProgramaRepository)
	.inSingletonScope();
StartupBuilder.bind<ITipoDocumentoEnProgramaService>(
	TYPES.TipoDocumentoEnProgramaService,
)
	.to(TipoDocumentoEnProgramaService)
	.inSingletonScope();

// programas
StartupBuilder.bind<IProgramaRepository>(TYPES.ProgramaRepository)
	.to(ProgramaRepository)
	.inSingletonScope();
StartupBuilder.bind<IProgramaService>(TYPES.ProgramaService)
	.to(ProgramaService)
	.inSingletonScope();

// coordinaciones
StartupBuilder.bind<ICoordinacionRepository>(TYPES.CoordinacionRepository)
	.to(CoordinacionRepository)
	.inSingletonScope();
StartupBuilder.bind<ICoordinacionService>(TYPES.CoordinacionService)
	.to(CoordinacionService)
	.inSingletonScope();

// niveles de malla
StartupBuilder.bind<INivelMallaRepository>(TYPES.NivelMallaRepository)
	.to(NivelMallaRepository)
	.inSingletonScope();
StartupBuilder.bind<INivelMallaService>(TYPES.NivelMallaService)
	.to(NivelMallaService)
	.inSingletonScope();

// asignaturas en niveles de malla
StartupBuilder.bind<IAsignaturaEnNivelMallaRepository>(
	TYPES.AsignaturaEnNivelMallaRepository,
)
	.to(AsignaturaEnNivelMallaRepository)
	.inSingletonScope();
StartupBuilder.bind<IAsignaturaEnNivelMallaService>(
	TYPES.AsignaturaEnNivelMallaService,
)
	.to(AsignaturaEnNivelMallaService)
	.inSingletonScope();

// asignaturas modulo en malla
StartupBuilder.bind<IAsignaturaModuloEnMallaRepository>(
	TYPES.AsignaturaModuloEnMallaRepository,
)
	.to(AsignaturaModuloEnMallaRepository)
	.inSingletonScope();
StartupBuilder.bind<IAsignaturaModuloEnMallaService>(
	TYPES.AsignaturaModuloEnMallaService,
)
	.to(AsignaturaModuloEnMallaService)
	.inSingletonScope();

// practicas comunitarias en malla
StartupBuilder.bind<IPracticaComunitariaEnMallaRepository>(
	TYPES.PracticaComunitariaEnMallaRepository,
)
	.to(PracticaComunitariaEnMallaRepository)
	.inSingletonScope();
StartupBuilder.bind<IPracticaComunitariaEnMallaService>(
	TYPES.PracticaComunitariaEnMallaService,
)
	.to(PracticaComunitariaEnMallaService)
	.inSingletonScope();

// practicas pre profesionales en malla
StartupBuilder.bind<IPracticaPreProfesionalEnMallaRepository>(
	TYPES.PracticaPreProfesionalEnMallaRepository,
)
	.to(PracticaPreProfesionalEnMallaRepository)
	.inSingletonScope();
StartupBuilder.bind<IPracticaPreProfesionalEnMallaService>(
	TYPES.PracticaPreProfesionalEnMallaService,
)
	.to(PracticaPreProfesionalEnMallaService)
	.inSingletonScope();

// niveles academicos
StartupBuilder.bind<INivelAcademicoRepository>(TYPES.NivelAcademicoRepository)
	.to(NivelAcademicoRepository)
	.inSingletonScope();
StartupBuilder.bind<INivelAcademicoService>(TYPES.NivelAcademicoService)
	.to(NivelAcademicoService)
	.inSingletonScope();

// materias en niveles academicos
StartupBuilder.bind<IMateriaEnNivelAcademicoRepository>(
	TYPES.MateriaEnNivelAcademicoRepository,
)
	.to(MateriaEnNivelAcademicoRepository)
	.inSingletonScope();
StartupBuilder.bind<IMateriaEnNivelAcademicoService>(
	TYPES.MateriaEnNivelAcademicoService,
)
	.to(MateriaEnNivelAcademicoService)
	.inSingletonScope();

// materias en horario
StartupBuilder.bind<IMateriaEnHorarioRepository>(
	TYPES.MateriaEnHorarioRepository,
)
	.to(MateriaEnHorarioRepository)
	.inSingletonScope();
StartupBuilder.bind<IMateriaEnHorarioService>(TYPES.MateriaEnHorarioService)
	.to(MateriaEnHorarioService)
	.inSingletonScope();

// ubicaciones
StartupBuilder.bind<IUbicacionRepository>(TYPES.UbicacionRepository)
	.to(UbicacionRepository)
	.inSingletonScope();
StartupBuilder.bind<IUbicacionService>(TYPES.UbicacionService)
	.to(UbicacionService)
	.inSingletonScope();

// periodos lectivos
StartupBuilder.bind<IPeriodoLectivoRepository>(TYPES.PeriodoLectivoRepository)
	.to(PeriodoLectivoRepository)
	.inSingletonScope();
StartupBuilder.bind<IPeriodoLectivoService>(TYPES.PeriodoLectivoService)
	.to(PeriodoLectivoService)
	.inSingletonScope();

// cortes
StartupBuilder.bind<ICorteRepository>(TYPES.CorteRepository)
	.to(CorteRepository)
	.inSingletonScope();
StartupBuilder.bind<ICorteService>(TYPES.CorteService)
	.to(CorteService)
	.inSingletonScope();

// calculos de costo
StartupBuilder.bind<ICalculoCostoRepository>(TYPES.CalculoCostoRepository)
	.to(CalculoCostoRepository)
	.inSingletonScope();
StartupBuilder.bind<ICalculoCostoService>(TYPES.CalculoCostoService)
	.to(CalculoCostoService)
	.inSingletonScope();

export { StartupBuilder };

