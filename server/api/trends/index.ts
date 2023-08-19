import type { DefineMethods } from 'aspida';
import type { TrendModel } from 'commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: TrendModel[];
  };
}>;
