
      import { Injectable }       from '@angular/core';
      import {
        CanActivate, Router,
        ActivatedRouteSnapshot,
        RouterStateSnapshot,
        CanActivateChild,
        NavigationExtras,
        CanLoad, Route
      }                           from '@angular/router';
      import { AuthService }      from './auth.service';
      
      @Injectable({
        providedIn: 'root',
      })
      export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
        constructor(private authService: AuthService, private router: Router) {}
      
        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
          let url: string = state.url;
      
          return this.checkRole(url);
        }
      
        canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
          return this.canActivate(route, state);
        }
      
        canLoad(route: Route): boolean {
          let url = `/${route.path}`;
      
          return this.checkRole(url);
        }
      
        checkRole(url: string): boolean {
          const user = this.authService.getUser();
          if (user.access_type == 'admin') { return true; }
      
          // Store the attempted URL for redirecting
          this.authService.redirectUrl = url;
          console.log(url); 
          
          this.router.navigate(['/']);
          return false;
        }
      }