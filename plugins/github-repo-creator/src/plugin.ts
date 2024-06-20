// import {
//   createPlugin,
//   createRoutableExtension,
// } from '@backstage/core-plugin-api';

// import { rootRouteRef } from './routes';

// export const githubRepoCreatorPlugin = createPlugin({
//   id: 'github-repo-creator',
//   routes: {
//     root: rootRouteRef,
//   },
// });

import {
  createPlugin,
  configApiRef,
  createApiFactory,
  discoveryApiRef,
  createRoutableExtension,
} from '@backstage/core-plugin-api';
import { GithubRepoApiRef, GithubRepoApiClient } from './api';
import { rootRouteRef } from './routes';

export const githubRepoPlugin = createPlugin({
  id: 'githubrepo',
  apis: [
    createApiFactory({
      api: GithubRepoApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        configApi: configApiRef,
      },
      factory: ({ discoveryApi, configApi }) =>
        new GithubRepoApiClient({ discoveryApi, configApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const GithubRepoPage = githubRepoPlugin.provide(
  createRoutableExtension({
    name: 'GithubRepoPage',
    component: () =>
      import('./components/GithubRepoComponent').then(m => m.GithubRepoComponent),
    mountPoint: rootRouteRef,
  }),
);






