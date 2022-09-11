import { Dispatch, SetStateAction, useState } from 'react'

function SearchInput ({ query, setQuery }: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>
}) {
  const [value, setValue] = useState(query)

  let timeout: ReturnType<typeof setTimeout> | undefined

  const throttleFunction = (func: () => void, delay: number) => {
    if (timeout) return
    timeout = setTimeout(() => {
      func()
      clearTimeout(timeout)
    }, delay)
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (e.target.value === '') return
    throttleFunction(() => {
      setQuery(e.target.value)
    }, 1000)
  }

  return <input value={value} placeholder="search" type="text" onChange={handleQueryChange} />
}

export default SearchInput
