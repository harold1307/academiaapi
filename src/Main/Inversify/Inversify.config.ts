import { Container } from "inversify";
import "reflect-metadata";
import { type PrismaClient } from "@prisma/client";
import { InstitucionService } from "../../Core/Institucion/Application/Service";

import type { IInstitucionRepository } from "../../Core/Institucion/Domain/IInstitucionRepository";
import type { IInstitucionService } from "../../Core/Institucion/Domain/IInstitucionService";
import { InstitucionRepository } from "../../Core/Institucion/Infraestructure/Repositories/InstitucionRepository";

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

export { StartupBuilder };
