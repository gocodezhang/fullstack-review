import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = ({ repos }) => {

  const reposUpdate = repos.filter((repo) => {return repo.status === 'updated'})
  const reposImport = repos.filter((repo) => {return repo.status === 'imported'})
  return (
    <div className="list">
      <h4> Repo List Component: <p id="repomessage"><b>{reposUpdate.length} existing repos</b> updated and <b>{reposImport.length} new repos</b> imported</p></h4>
      {repos.map((repo) => {
        return <RepoEntry repo={repo} key={repo.repo_id}></RepoEntry>
      })}
    </div>
  )
}

export default RepoList;