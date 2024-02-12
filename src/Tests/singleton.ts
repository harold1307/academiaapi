import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, type DeepMockProxy } from "jest-mock-extended";

import { Prisma } from "../Main/Prisma/PrismaClient";

jest.mock("../Main/Prisma/PrismaClient", () => ({
	__esModule: true,
	Prisma: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
	mockReset(prismaMock);
});

export const prismaMock = Prisma as unknown as DeepMockProxy<PrismaClient>;
