# API REST Node.js 18 para Azure Functions con DDD

## Introduccion

Esta API REST representa una aplicación basada en Node.js 18 que utiliza Azure Functions para proporcionar una arquitectura serverless altamente escalable. La aplicación sigue los principios de Domain-Driven Design (DDD), que permite organizar el código de manera clara y modular en torno a los dominios específicos del negocio.

## Requisitos el proyecto

Los requisitos minimos del proyecto son los siguientes:

- [pnpm](https://pnpm.io/es/)
- [Azure functions core tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-javascript)
- [NodeJS 18](https://nodejs.org/en)

## Iniciando el proyecto

1. Instalacion de dependencias

```bash
pnpm i
# o
pnpm install
```

2. Local settings basico para azure functions

```json
// local.settings.json
{
	"IsEncrypted": false,
	"Values": {
		"AzureWebJobsStorage": "UseDevelopmentStorage=true",
		"FUNCTIONS_WORKER_RUNTIME": "node",
		"AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
		"DATABASE_URL": "xxxxxxxxxxxxxxxxxxxxxxxxxxx"
	},
	"Host": {
		"CORS": "*"
	}
}
```

3. Generar los tipos de Prisma ORM

```bash
pnpm postinstall
# o
pnpm dlx prisma generate
```

4. Buildear el proyecto

```bash
# Para desarrollar con hot reloading
pnpm watch
# Para buildear una vez
pnpm build
```

5. Iniciar la aplicacion

```bash
pnpm start
```

## Hacer cambios a schema.prisma [(docs)](https://www.prisma.io/docs/orm/prisma-migrate/workflows/team-development)

Las migraciones de base de datos son un componente esencial en el ciclo de vida de cualquier aplicación que interactúa con una base de datos. Estas migraciones no solo son una práctica recomendada, sino que también juegan un papel fundamental en el desarrollo, mantenimiento y evolución de sistemas.

1. Realiza los cambios

```prisma
model User {
  /* ... */
  favoriteColor String?
}
```

2. Genera la migracion

```bash
pnpm dlx prisma migrate dev --name new-field
```

## Implementar modulo

1. Crea una carpeta con el nombre del modulo en src/Core con las divisiones base

```
├── src
|   ├── Core
│   │   ├── NuevoModulo
│   │   |   ├── Application
│   │   |   ├── Domain
│   │   |   ├── Infrastructure
```

2. Crea los archivos base del Domain

```ts
// .../NuevoModulo/Domain/INuevoModulo.ts
export type INuevoModulo = {
	/* ... */
};

// .../NuevoModulo/Domain/INuevoModuloRepository.ts
export type INuevoModuloRepository = {
	/* ... */
};

// .../NuevoModulo/Domain/INuevoModuloService.ts
export type INuevoModuloService = {
	/* ... */
};

// .../NuevoModulo/Domain/ICreateNuevoModulo.ts
export type ICreateNuevoModulo = {
	/* ... */
};

// .../NuevoModulo/Domain/IUpdateNuevoModulo.ts
export type IUpdateNuevoModulo = {
	/* ... */
};
```

3. Crea el repositorio del nuevo modulo

```ts
// .../NuevoModulo/Infrastructure/Repositories/NuevoModuloRepository.ts

// @injectable hace que la clase sea inyectable y por lo tanto pueda usarse en otros modulos.
@injectable()
export class NuevoModuloRepository implements INuevoModuloRepository {
  // @inject inyecta un modulo
  constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient)
}
// resaltar la importancia del `implements` al dominio de la clase.
```

4. Habilita la inyeccion del repositorio

```ts
// .../Main/Inversify/types.ts
export const TYPES = {
	/* ... */
	NuevoModuloRepository: Symbol.for("NuevoModuloRepository"),
} as const;

// .../Main/Inversify/Inversify.config.ts
StartupBuilder.bind<INuevoModuloRepository>(TYPES.NuevoModuloRepository)
	.to(NuevoModuloRepository)
	.inSingletonScope();
```

5. Implementa los DTOs

```ts
// .../NuevoModulo/Infrastructure/DTOs/CreateNuevoModuloDTO.ts
const schema = z.object<ZodInferSchema<ICreateNuevoModulo>>({
	/* ... */
});
export class CreateNuevoModuloDTO {
	/* ... */
}

// .../NuevoModulo/Infrastructure/DTOs/UpdateNuevoModuloDTO.ts
const schema = z.object<ZodInferSchema<IUpdateNuevoModulo>>({
	/* ... */
});
export class UpdateNuevoModuloDTO {
	/* ... */
}
```

6. Crea el servicio

```ts
// .../NuevoModulo/Application/Service.ts

@injectable()
export class NuevoModuloService implements INuevoModuloService {
	constructor(
		@inject(TYPES.NuevoModuloRepository)
		private _nuevoModuloRepository: INuevoModuloRepository,
	) {}

	/* ... */
}
```

7. Habilita la inyeccion del servicio

```ts
// .../Main/Inversify/types.ts
export const TYPES = {
	/* ... */
	NuevoModuloService: Symbol.for("NuevoModuloService"),
} as const;

// .../Main/Inversify/Inversify.config.ts
StartupBuilder.bind<INuevoModuloService>(TYPES.NuevoModuloService)
	.to(NuevoModuloService)
	.inSingletonScope();
```

8. Usa el servicio

- En este punto podras usar el servicio en los endpoints, recalcar que los endpoints no deben tener acceso a los repositorios, solo a los servicios.

```ts
// .../functions/nuevosModulos/getAll.ts
export async function nuevosModulosGetAll(
	request: HttpRequest,
	context: InvocationContext,
): Promise<HttpResponseInit> {
	/* ... */

	const _nuevoModuloService = StartupBuilder.resolve(NuevoModuloService);
}

app.http("nuevosModulosGetAll", {
	methods: ["GET"],
	authLevel: "anonymous",
	handler: nuevosModulosGetAll,
});
```

9. Notas

- En este punto te habras dado cuenta que el proceso de implementacion de un modulo es largo, por ello es importante comenzar con lo necesario y despues extender tus necesidades.

- Los types generados por Prisma son necesarios para proveer una unica fuente del esquema de las entidades, entonces es imprescindible su uso a la hora de crear el dominio base de un modulo y que este ultimo sea usado en los dominios de creacion y actualizacion.

- Sobre el tema de validaciones usamos Zod, es importante que cada modulo tenga su propia validacion de parametros a excepcion de los repositorios, ya que son usados unicamente por servicios y estos ya son validados de por si.

## Importante

- La arquitectura esta basada en DDD, donde un modulo se divide en 3 partes: Application, Domain e Infrastructure.

- Todo endpoint debe estar especificamente en la carpeta functions.

- Todo endpoint debe ser adicionado al Postman de la aplicacion.

- Nunca usar los comandos:
  - `prisma db push`, genera conflicto con las migraciones.
