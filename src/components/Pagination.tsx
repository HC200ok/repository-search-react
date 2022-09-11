import { useMemo, Dispatch, SetStateAction } from 'react'
import './Pagination.scss'

type PaginationItem = {
  type: 'button',
  page: number,
  active: boolean,
  activePrev: boolean,
} | {
  type: 'omission',
};

export default function Pagination ({ maxPage, currentPage, setCurrentPage }: {
  maxPage: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  const totalVisible = 7

  const changePage = (item: PaginationItem) => {
    if (item.type === 'button' && !item.active) setCurrentPage(item.page)
  }

  const paginationItems = useMemo(() => {
    const paginationItems: PaginationItem[] = []
    if (maxPage <= totalVisible) {
    // x,x,x,x
      for (let i = 1; i <= maxPage; i += 1) {
        paginationItems.push({
          type: 'button',
          page: i,
          active: i === currentPage,
          activePrev: (i + 1) === currentPage
        })
      }
    } else if ([1, 2, maxPage, maxPage - 1].includes(currentPage)) {
    // x,x,x,...,x,x,x
      for (let i = 1; i <= totalVisible; i += 1) {
        if (i <= 3) {
          paginationItems.push({
            type: 'button',
            page: i,
            active: i === currentPage,
            activePrev: (i + 1) === currentPage
          })
        } else if (i === 4) {
          paginationItems.push({
            type: 'omission'
          })
        } else {
          const page = maxPage - (totalVisible - i)
          paginationItems.push({
            type: 'button',
            page,
            active: page === currentPage,
            activePrev: (page + 1) === currentPage
          })
        }
      }
    } else if ([3, 4].includes(currentPage)) {
    // x,x,x,x,x,...,x
      for (let i = 1; i <= totalVisible; i += 1) {
        if (i <= 5) {
          paginationItems.push({
            type: 'button',
            page: i,
            active: i === currentPage,
            activePrev: (i + 1) === currentPage
          })
        } else if (i === 6) {
          paginationItems.push({
            type: 'omission'
          })
        } else {
          paginationItems.push({
            type: 'button',
            page: maxPage,
            active: maxPage === currentPage,
            activePrev: (i + 1) === currentPage
          })
        }
      }
    } else if ([maxPage - 2, maxPage - 3].includes(currentPage)) {
    // x,...,x,x,x,x,x
      for (let i = 1; i <= totalVisible; i += 1) {
        if (i === 1) {
          paginationItems.push({
            type: 'button',
            page: 1,
            active: currentPage === 1,
            activePrev: (i + 1) === currentPage
          })
        } else if (i === 2) {
          paginationItems.push({
            type: 'omission'
          })
        } else {
          const page = maxPage - (totalVisible - i)
          paginationItems.push({
            type: 'button',
            page,
            active: page === currentPage,
            activePrev: (page + 1) === currentPage
          })
        }
      }
    } else {
    // x,...,x,x,x,...,x
      for (let i = 1; i <= totalVisible; i += 1) {
        if (i === 1) {
          paginationItems.push({
            type: 'button',
            page: 1,
            active: currentPage === 1,
            activePrev: (i + 1) === currentPage
          })
        } else if (i === 2 || i === 6) {
          paginationItems.push({
            type: 'omission'
          })
        } else if (i === 7) {
          paginationItems.push({
            type: 'button',
            page: maxPage,
            active: maxPage === currentPage,
            activePrev: (i + 1) === currentPage
          })
        } else {
          const diff = 4 - i
          const page = currentPage - diff
          paginationItems.push({
            type: 'button',
            page,
            active: page === currentPage,
            activePrev: (page + 1) === currentPage
          })
        }
      }
    }
    return paginationItems
  }, [maxPage, currentPage])

  return (
    <div className="buttons-pagination">
      {paginationItems.map((item, index) => (
        <div
          key={index}
          className={
              `item
              ${item.type === 'button' ? 'button' : ''}
              ${item.type === 'button' && item.active ? 'active' : ''}
              ${item.type === 'button' && item.activePrev ? 'active-prev' : ''}
              ${item.type === 'omission' ? 'omission' : ''}`
            }
          onClick={() => changePage(item)}
        >
          { item.type === 'button' ? item.page : '...' }
        </div>
      ))}
    </div>
  )
}
