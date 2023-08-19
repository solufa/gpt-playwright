import { twitterRepository } from '$/repository/twitterRepository';

export const twitterUseCase = {
  fetchTrends: async () => {
    const trends = await twitterRepository.fetchTrends();

    return trends;
  },
};
