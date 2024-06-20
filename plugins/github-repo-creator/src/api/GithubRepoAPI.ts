import { ConfigApi, createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';
import { GithubRepo } from '../types';

export type Options = {
  discoveryApi: DiscoveryApi;
  configApi: ConfigApi;
};

export interface GithubRepoApi {
  createRepo(repo: GithubRepo): Promise<GithubRepo>;
}

export const GithubRepoApiRef = createApiRef<GithubRepoApi>({
  id: 'plugin.github-repo-api.service',
});

export class GithubRepoApiClient implements GithubRepoApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly configApi: ConfigApi;

  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
    this.configApi = options.configApi;
  }

  private async getBaseUrl() {
    const proxyPath = this.configApi.getOptionalString('githubrepo.proxyPath') || '/githubrepo/api';
    return `${await this.discoveryApi.getBaseUrl('proxy')}${proxyPath}`;
  }

  private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
    const proxyUrl = await this.getBaseUrl();
    const resp = await fetch(`${proxyUrl}${input}`, init);
    if (!resp.ok) throw new Error(resp.statusText);
    return await resp.json();
  }

  async createRepo(repo: GithubRepo): Promise<GithubRepo> {
    const token = process.env.GITHUB_TOKEN;
    console.log("Token value:" , token)
    return await this.fetch<GithubRepo>('/user/repos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(repo),
    });
  }
}



