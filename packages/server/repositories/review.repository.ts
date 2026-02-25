import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient, type Review } from '../generated/prisma/client';

export const reviewRepository = {
  async getReviews(productId: number): Promise<Review[]> {
    const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
    const prisma = new PrismaClient({ adapter });

    // SELECT * FROM reviews WHERE productId = @productId ORDER BY createdAt DESC
    return prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });
  },
};
