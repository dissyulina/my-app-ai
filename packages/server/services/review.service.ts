import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';
import type { Review } from '../generated/prisma/client';

export const reviewService = {
  async createReview(
    productId: number,
    author: string,
    rating: number,
    content: string
  ): Promise<Review> {
    return reviewRepository.createReview(productId, author, rating, content);
  },

  async deleteReview(productId: number, reviewId: number): Promise<void> {
    const review = await reviewRepository.getSingleReview(reviewId);
    if (!review || review.productId !== productId) {
      throw new Error('Review not found.');
    }

    await reviewRepository.deleteReview(reviewId);
    await reviewRepository.deleteReviewSummary(productId);
  },

  async summarizeReviews(productId: number): Promise<string> {
    const existingSummary = await reviewRepository.getReviewSummary(productId);
    if (existingSummary) {
      return existingSummary;
    }

    // Get the last 10 reviews
    const reviews = await reviewRepository.getReviews(productId, 10);
    const joinedReviews = reviews.map((r) => r.content).join('\n\n');

    const summary = await llmClient.summarizeReviews(joinedReviews);

    await reviewRepository.storeReviewSummary(productId, summary);

    return summary;
  },

  async deleteReviewSummary(productId: number): Promise<void> {
    const existingSummary = await reviewRepository.getReviewSummary(productId);
    if (!existingSummary) {
      throw new Error('No summary found for this product.');
    }

    await reviewRepository.deleteReviewSummary(productId);
  },
};
