import { Dispatch, SetStateAction } from 'react'
import type { SearchReposParameters } from '../type/repository'

type PerPage = SearchReposParameters['per_page']

export default function PerPageSelector ({ perPage, setPerPage }: {
  perPage: PerPage;
  setPerPage: Dispatch<SetStateAction<PerPage>>;
}) {
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value))
  }

  return (
    <div className="selector">
      <label>per_page: </label>
      <select value={perPage} onChange={handlePerPageChange}>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  )
}
