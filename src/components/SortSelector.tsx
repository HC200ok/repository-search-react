import { Dispatch, SetStateAction } from 'react'
import type { SearchReposParameters } from '../type/repository'

type Sort = SearchReposParameters['sort']

export default function SortSelector ({ sort, setSort }: {
  sort: Sort;
  setSort: Dispatch<SetStateAction<Sort>>;
}) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as Sort)
  }

  return (
    <div className="selector">
      <label>sort: </label>
      <select value={sort} onChange={handleSortChange}>
        <option value="stars">stars</option>
        <option value="forks">forks</option>
        <option value="help-wanted-issues">help-wanted-issues</option>
        <option value="updated">updated</option>
      </select>
    </div>
  )
}
