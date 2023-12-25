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
import type { IMallaCurricularRepository } from "../../Core/MallaCurricular/Domain/IMallaCurricularRepository";
import type { IMallaCurricularService } from "../../Core/MallaCurricular/Domain/IMallaCurricularService";
import { MallaCurricularRepository } from "../../Core/MallaCurricular/Infraestructure/Repositories/MallaCurricularRepository";

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

export { StartupBuilder };
