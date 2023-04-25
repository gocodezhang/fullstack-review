import React from 'react';

const RepoEntry = function({repo}) {

  return (
    <div>
      <a href={`${repo.repo_url}`}>{repo.repo_name}</a>
      <ul>
        <li>Owner: {repo.owner_name}</li>
        <li>Description: {repo.description}</li>
        <li>Fork Count: {repo.forks_count}</li>
      </ul>
    </div>
  )
}

export default RepoEntry;