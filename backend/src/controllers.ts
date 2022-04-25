import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const getPolicies = async (req: Request, res: Response) => {
  const { search } = req.query;

  const searchQuery: Prisma.PolicyWhereInput = search
    ? {
        OR: [
          { provider: { contains: search as string, mode: "insensitive" } },
          {
            customer: {
              firstName: { contains: search as string, mode: "insensitive" },
            },
          },
          {
            customer: {
              lastName: { contains: search as string, mode: "insensitive" },
            },
          },
        ],
      }
    : {};

  const statusFilter: Prisma.PolicyWhereInput = {
    OR: [{ status: "ACTIVE" }, { status: "PENDING" }],
  };

  const policies = await prisma.policy.findMany({
    where: {
      AND: [{ ...searchQuery }, { ...statusFilter }],
    },
    select: {
      id: true,
      provider: true,
      insuranceType: true,
      status: true,
      startDate: true,
      endDate: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
      },
    },
  });

  res.json(policies);
};

export default getPolicies;
