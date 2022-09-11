import { useEffect, useState } from 'react'
import './App.scss'

import { Octokit } from '@octokit/core'
import type { Repository, SearchReposParameters } from './type/repository'

import SearchInput from './components/searchInput'
import OrderSelector from './components/OrderSelector'
import PerPageSelector from './components/PerPageSelector'
import SortSelector from './components/SortSelector'
import List from './components/List'
import Pagination from './components/Pagination'

function App () {
  const auth = import.meta.env.VITE_GITHUB_AUTH
  const octokit = new Octokit({ auth })

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SearchReposParameters['sort']>('stars')
  const [order, setOrder] = useState<SearchReposParameters['order']>('desc')
  const [perPage, setPerPage] = useState<SearchReposParameters['per_page']>(10)

  const [loading, setLoading] = useState(false)
  const [searchReposFailed, setSearchReposFailed] = useState(false)
  const [repositories, setRepositories] = useState<Repository[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  useEffect(() => {
    if (query === '') return
    setLoading(true)

    const fetchData = async () => {
      const { data: { items, total_count: totalCount } } = await octokit.request('GET /search/repositories', {
        q: query,
        sort,
        order,
        per_page: perPage,
        page: currentPage
      })
      setRepositories(items)
      // Only the first 1000 search results are available
      const maxCount = totalCount > 1000 ? 1000 : totalCount
      if (perPage) setMaxPage(Math.ceil(maxCount / perPage))
      setLoading(false)
    }

    fetchData().catch((error) => {
      setSearchReposFailed(true)
      console.error(error)
      setLoading(false)
    })
  }, [query, sort, order, perPage, currentPage])

  let result: JSX.Element

  if (searchReposFailed) {
    result = <div className="failed">search repositories failed</div>
  } else {
    result = repositories.length
      ? (
        <div>
          <List repositories={repositories} />

          <div className="pagination-wrapper">
            <Pagination
              currentPage={currentPage}
              maxPage={maxPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        )
      : <div className="empty">no repositories</div>
  }

  return (
    <div className="App">
      <div className="parameters-wrapper">
        <SearchInput query={query} setQuery={setQuery} />
        <OrderSelector order={order} setOrder={setOrder} />
        <SortSelector sort={sort} setSort={setSort} />
        <PerPageSelector perPage={perPage} setPerPage={setPerPage} />
      </div>
      <img className={`loading ${!loading ? 'none' : ''}`} src="https://acegif.com/wp-content/uploads/loading-45.gif" />
      {result}
    </div>
  )
}

export default App
