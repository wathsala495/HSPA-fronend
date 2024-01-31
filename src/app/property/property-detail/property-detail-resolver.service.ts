import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PropertyModel } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<PropertyModel>{

  constructor(private housingService:HousingService,private router: Router) { }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PropertyModel | null> {
  //   const propId = route.params['id'];
  //   return this.housingService.getProperty(propId).pipe(
  //     catchError((error: any) => {
  //       // Handle error, e.g., navigate to an error page or return a default value
  //       this.router.navigate(['/error']);
  //       return of(null as PropertyModel | null); // Return a default value or handle the error
  //     })
  //   );
  // }
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): PropertyModel | Observable<PropertyModel> | Promise<PropertyModel> {
  //      const propId = route.params['id'];
  //   return this.housingService.getProperty(propId).pipe(
  //     catchError((error: any) => {
  //       // Handle error, e.g., navigate to an error page or return a default value
  //       this.router.navigate(['/error']);
  //       return of(null as PropertyModel | null); // Return a default value or handle the error
  //     })
  //   );
  // //  
  // }
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): PropertyModel | Observable<PropertyModel> | Promise<PropertyModel> {
  //     const propId = route.params['id'];
  //     return this.housingService.getProperty(propId)
  // }
  resolve( route: ActivatedRouteSnapshot): Observable<any> {
    // Fetch data from a service and return it
    const propId = route.params['id'];
    return this.housingService.getProperty(+propId).pipe(
      catchError(error=>{
        this.router.navigate(['/']);
        return of(null)
      })
    );
  }
}
