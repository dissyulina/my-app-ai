import axios from 'axios';

export type Review = {
  id: number;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
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
  fetchReviews(productId: number) {
    return axios
      .get<GetReviewsResponse>(`/api/products/${productId}/reviews`)
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
