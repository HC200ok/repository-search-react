import type { Repository } from '../type/repository'
import './ListItem.scss'

export default function ListItem ({ repository }: {
  repository: Repository;
}) {
  return (
    <div className="repository">
      <a className="name" target="_blank" href={repository.html_url} rel="noreferrer">
        { repository.name }
      </a>
      <div className="description">
        { repository.description }
      </div>
    </div>
  )
}
