import express, { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(express.json())

app.get('/policies', async (req: Request, res: Response) => {
  const { search } = req.query;

  const searchQuery: Prisma.PolicyWhereInput = search
    ? {
      OR: [
        { provider: { contains: search as string, mode: 'insensitive' } },
        { customer: { firstName: { contains: search as string, mode: 'insensitive' } } },
        { customer: { lastName: { contains: search as string, mode: 'insensitive' } } }
      ],
    }
    : {};

    const statusFilter: Prisma.PolicyWhereInput = {
      OR: [
        { status: 'ACTIVE' },
        { status: 'PENDING' }
      ],
    };

  const policies = await prisma.policy.findMany({
    where: {
      ...searchQuery,
      ...statusFilter
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
          dateOfBirth: true
        }
      }
    }
  })

  res.json(policies);
})

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀')
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`🚀  Server ready at ${port}`);
  });
}

export default app