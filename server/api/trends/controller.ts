import { twitterUseCase } from '$/useCase/twitterUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => twitterUseCase.fetchTrends().then((trends) => ({ status: 200, body: trends })),
}));
