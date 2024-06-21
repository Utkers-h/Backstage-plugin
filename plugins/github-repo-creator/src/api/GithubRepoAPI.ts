
import { Octokit } from '@octokit/rest';
import { ConfigApi, createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';

export const GithubRepoApiRef = createApiRef<GithubRepoApi>({
  id: 'plugin.github-repo-api.service',
});

export type Options = {
  configApi: ConfigApi;
  discoveryApi: DiscoveryApi;
};

// Creating a interface for the repo 
export interface GithubRepoApi {
  createRepo(repoName: string, repoDescription: string, isPrivate: boolean): Promise<void>;
}

export class GithubRepoApiClient implements GithubRepoApi {
  private readonly octokit: Octokit;

  constructor(options: Options) {
    const token = "${GITHUB_TOKEN}"
    this.octokit = new Octokit({
      auth: token,
    });
  }

  async createRepo(repoName: string, repoDescription: string, isPrivate: boolean = false): Promise<void> {
    const response = await this.octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: repoDescription,
      private: isPrivate,  // Set private flag based on input or default value
    });

    if (response.status !== 201) {
      throw new Error('Failed to create repository');
    }
  }
}
