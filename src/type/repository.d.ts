import { Endpoints } from '@octokit/types'

type Repository = Endpoints['GET /search/repositories']['response']['data']['items'][0];
type SearchReposParameters = Endpoints['GET /search/repositories']['parameters'];

export {
  Repository,
  SearchReposParameters
}
