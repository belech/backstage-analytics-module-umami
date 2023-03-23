import { analyticsModuleUmami } from './plugin';

describe('analytics-module-matomo', () => {
  it('should export plugin', () => {
    expect(analyticsModuleUmami).toBeDefined();
  });
});
