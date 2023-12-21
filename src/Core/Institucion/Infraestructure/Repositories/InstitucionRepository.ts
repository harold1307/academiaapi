import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IInstitucionRepository } from "../../Domain/IInstitucionRepository";
import type { ICreateInstitucion } from "../DTOs/CreateInstitucionDTO";
import type { IUpdateInstitucion } from "../DTOs/UpdateInstitucionDTO";

@injectable()
export class InstitucionRepository implements IInstitucionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create(data: ICreateInstitucion) {
		return this._client.institucion.create({ data });
	}
	async getAll() {
		return this._client.institucion.findMany();
	}

	async getById(id: string) {
		return this._client.institucion.findUnique({ where: { id } });
	}

	async update({
		id,
		institucion,
	}: {
		id: string;
		institucion: IUpdateInstitucion;
	}) {
		return this._client.institucion.update({
			where: {
				id,
			},
			data: institucion,
		});
	}

	// => ({
	//   async save(user) {
	//     const nUser = client.user.create({
	//       data: {
	//         id: uuidv4(),
	//         name: user.name,
	//         email: user.email,
	//         lastname: user.lastname,
	//         password: user.password,
	//         createdAt: user.createdAt.toISOString() || new Date().toISOString(),
	//         updatedAt: user.updatedAt.toISOString() || new Date().toISOString(),
	//       },
	//     });
	//     return nUser;
	//   },
	//   async find(criteria) {
	//     if (!Array.isArray(criteria) || !criteria.every(isFilter)) {
	//       throw new Error("Invalid input: criteria must be an array of Filters");
	//     }
	//     const cacheKey = criteriaConverterToCacheKey(criteria);
	//     const cachedResult = await getCache<IUserBase>(CustomRedisClient, cacheKey);
	//     if (cachedResult) {
	//       return cachedResult;
	//     }
	//     const user = await client.user.findFirst({
	//       where: criteriaConverter(criteria),
	//     });

	//     if (!user) {
	//       return null;
	//     }
	//     await setCache(CustomRedisClient, cacheKey, JSON.stringify(user), { EX: 3600 });
	//     return user;
	//   },
	//   // async update(id: string, user) {
	//   //   const updatedUser = await client.user.update({
	//   //     where: { id },
	//   //     data: {
	//   //       name: user.name,
	//   //       lastname: user.lastname,
	//   //       updatedAt: new Date().toISOString(),
	//   //     }
	//   //   });

	//   //   // Invalidate the cache for this user
	//   //   const cacheKey = userToCacheKey({ id });
	//   //   await CustomRedisClient.del(cacheKey);

	//   //   return updatedUser;
	//   // },
	// });
}
