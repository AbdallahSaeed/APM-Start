import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export  class CoreService {
  constructor(private activeRoute: ActivatedRoute, private router: Router) {}

  get Router(): Router {
    return this.Router;
  }
  get ActiveRoute(): ActivatedRoute {
    return this.activeRoute;
  }

    getParm(key: string): string | null {
      return this.activeRoute.snapshot.paramMap.get(key);
    }

//   getParm(key: string): Observable<string | null> {
//     this.activeRoute.paramMap.subscribe((parms) => {
//       if (parms.has(key)) {
//         const value = parms.get(key);
//         return of(value);
//       }
//       return of(null);
//     });
//   }
}
