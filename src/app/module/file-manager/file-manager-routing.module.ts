// src/app/file-manager/file-manager-routing.module.ts

import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { FileManagerComponent } from './file-manager.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { FileManagerService } from './file-manager.service';

/* ------------------------------- RESOLVERS ------------------------------- */

const folderResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const fileManagerService = inject(FileManagerService);
  const router = inject(Router);

  return fileManagerService.getItems(route.paramMap.get('folderId')).pipe(
    catchError(error => {
      console.error(error);
      const parentUrl = state.url.split('/').slice(0, -1).join('/');
      router.navigateByUrl(parentUrl);
      return throwError(() => error);
    })
  );
};

const itemResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const fileManagerService = inject(FileManagerService);
  const router = inject(Router);

  return fileManagerService.getItemById(route.paramMap.get('id')).pipe(
    catchError(error => {
      console.error(error);
      const parentUrl = state.url.split('/').slice(0, -1).join('/');
      router.navigateByUrl(parentUrl);
      return throwError(() => error);
    })
  );
};

/* ----------------------------- CAN DEACTIVATE ---------------------------- */

const canDeactivateFileManagerDetails = (
  component: DetailsComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
) => {
  let nextRoute: ActivatedRouteSnapshot = nextState.root;
  while (nextRoute.firstChild) {
    nextRoute = nextRoute.firstChild;
  }

  if (!nextState.url.includes('/file-manager')) {
    return true;
  }

  if (nextState.url.includes('/details')) {
    return true;
  }

  return component.closeDrawer().then(() => true);
};

/* -------------------------------- ROUTES -------------------------------- */

const routes: Routes = [
  {
    path: '',
    component: FileManagerComponent,
    children: [
      {
        path: 'folders/:folderId',
        component: ListComponent,
        resolve: {
          item: folderResolver,
        },
        children: [
          {
            path: 'details/:id',
            component: DetailsComponent,
            resolve: {
              item: itemResolver,
            },
            canDeactivate: [canDeactivateFileManagerDetails],
          },
        ],
      },
      {
        path: '',
        component: ListComponent,
        resolve: {
          items: () => inject(FileManagerService).getItems(),
        },
        children: [
          {
            path: 'details/:id',
            component: DetailsComponent,
            resolve: {
              item: itemResolver,
            },
            canDeactivate: [canDeactivateFileManagerDetails],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileManagerRoutingModule {}


