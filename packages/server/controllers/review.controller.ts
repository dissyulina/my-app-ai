import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
  async getReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product ID.' });
      return;
    }

    const product = await productRepository.getProduct(productId);
    if (!product) {
      res.status(400).json({ error: 'Product does not exist.' });
      return;
    }

    const reviews = await reviewRepository.getReviews(productId);
    const summary = await reviewRepository.getReviewSummary(productId);

    res.json({
      summary,
      reviews,
    });
  },

  async createReview(req: Request, res: Response) {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product ID.' });
      return;
    }

    const product = productRepository.getProduct(productId);
    if (!product) {
      res.status(400).json({ error: 'Invalid product.' });
      return;
    }

    const { author, rating, content } = req.body;

    if (!author || typeof author !== 'string') {
      res.status(400).json({ error: 'Invalid author.' });
      return;
    }
    if (!content || typeof content !== 'string') {
      res.status(400).json({ error: 'Invalid content.' });
      return;
    }
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      res
        .status(400)
        .json({ error: 'Rating must be a number between 1 and 5.' });
      return;
    }

    const review = await reviewService.createReview(
      productId,
      author,
      rating,
      content
    );
    res.status(201).json({ review });
  },

  async summarizeReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product ID.' });
      return;
    }

    const product = productRepository.getProduct(productId);
    if (!product) {
      res.status(400).json({ error: 'Invalid product.' });
      return;
    }

    const reviews = await reviewRepository.getReviews(productId, 1);
    if (!reviews.length) {
      res.status(400).json({ error: 'There are no reviews to summarize.' });
      return;
    }

    const summary = await reviewService.summarizeReviews(productId);
    res.json({ summary });
  },

  async deleteReviewSummary(req: Request, res: Response) {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product ID.' });
      return;
    }

    const product = productRepository.getProduct(productId);
    if (!product) {
      res.status(400).json({ error: 'Invalid product.' });
      return;
    }

    try {
      await reviewService.deleteReviewSummary(productId);
      res.status(200).json({ message: 'Summary deleted successfully.' });
    } catch {
      res.status(404).json({ error: 'No summary found for this product.' });
    }
  },
};
