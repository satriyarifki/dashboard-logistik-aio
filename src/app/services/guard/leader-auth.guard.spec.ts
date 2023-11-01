import { TestBed } from '@angular/core/testing';

import { LeaderAuthGuard } from './leader-auth.guard';

describe('LeaderAuthGuard', () => {
  let guard: LeaderAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeaderAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
