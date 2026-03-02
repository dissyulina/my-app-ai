import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient, type Review } from '../generated/prisma/client';
import dayjs from 'dayjs';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

export const reviewRepository = {
  async getReviews(productId: number, limit?: number): Promise<Review[]> {
    // SELECT * FROM reviews WHERE productId = @productId ORDER BY createdAt DESC
    return prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },

  storeReviewSummary(productId: number, summary: string) {
    const now = new Date();
    const expiresAt = dayjs().add(7, 'days').toDate();
    const data = {
      content: summary,
      expiresAt,
      generatedAt: now,
      productId,
    };

    return prisma.summary.upsert({
      where: { productId },
      create: data,
      update: data,
    });
  },

  async getReviewSummary(productId: number): Promise<string | null> {
    const summary = await prisma.summary.findFirst({
      where: {
        AND: [
          { productId },
          { expiresAt: { gt: new Date() } }, // WHERE expiresAt > ...
        ],
      },
    });

    return summary ? summary.content : null;
  },
};
