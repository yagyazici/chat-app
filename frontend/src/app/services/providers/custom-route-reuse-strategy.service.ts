import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomRouteReuseStrategyService implements RouteReuseStrategy {

  constructor() { }

  shouldDetach = (route: ActivatedRouteSnapshot): boolean => false;

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void { }
  
  shouldAttach = (route: ActivatedRouteSnapshot): boolean => false;

  retrieve = (route: ActivatedRouteSnapshot): DetachedRouteHandle | null => null;

  shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => future.data["shouldReuse"] || false;
}
