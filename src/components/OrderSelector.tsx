import { Dispatch, SetStateAction } from 'react'
import type { SearchReposParameters } from '../type/repository'

type Order = SearchReposParameters['order']

export default function OrderSelector ({ order, setOrder }: {
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>
}) {
  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value as Order)
  }

  return (
    <div className="selector">
      <label>order: </label>
      <select value={order} onChange={handleOrderChange}>
        <option value="desc">desc</option>
        <option value="asc">asc</option>
      </select>
    </div>
  )
}
