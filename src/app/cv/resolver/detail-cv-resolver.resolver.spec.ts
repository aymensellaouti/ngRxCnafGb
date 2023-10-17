import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { detailCvResolverResolver } from './detail-cv-resolver.resolver';

describe('detailCvResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailCvResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
