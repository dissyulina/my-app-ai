import axios from 'axios';

export type Review = {
  id: number;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
};

export type CreateReviewPayload = {
  author: string;
  rating: number;
  content: string;
};

export type CreateReviewResponse = {
  review: Review;
};

export type DeleteReviewResponse = {
  message: string;
};

export type GetReviewsResponse = {
  summary: string | null;
  reviews: Review[];
};

export type SummarizeResponse = {
  summary: string;
};

export type DeleteSummaryResponse = {
  message: string;
};

export const reviewsApi = {
  createReview(productId: number, payload: CreateReviewPayload) {
    return axios
      .post<CreateReviewResponse>(`/api/products/${productId}/reviews`, payload)
      .then((res) => res.data);
  },

  fetchReviews(productId: number) {
    return axios
      .get<GetReviewsResponse>(`/api/products/${productId}/reviews`)
      .then((res) => res.data);
  },

  deleteReview(productId: number, reviewId: number) {
    return axios
      .delete<DeleteReviewResponse>(
        `/api/products/${productId}/reviews/${reviewId}`
      )
      .then((res) => res.data);
  },

  summarizeReviews(productId: number) {
    return axios
      .post<SummarizeResponse>(`/api/products/${productId}/reviews/summarize`)
      .then((res) => res.data);
  },

  deleteSummary(productId: number) {
    return axios
      .delete<DeleteSummaryResponse>(
        `/api/products/${productId}/reviews/summarize`
      )
      .then((res) => res.data);
  },
};
