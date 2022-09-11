import ListItem from './ListItem'
import type { Repository } from '../type/repository'

export default function List ({ repositories }: {
  repositories: Repository[];
}) {
  return (
    <div className="repositories">
      {repositories.map((repository: Repository) => <ListItem repository={repository} key={repository.id} />)}
    </div>
  )
}
