import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component: {repos.length} repos fetched</h4>
    {repos.map((repo) => {
      return <RepoEntry repo={repo} key={repo.repo_id}></RepoEntry>
    })}
  </div>
)

export default RepoList;