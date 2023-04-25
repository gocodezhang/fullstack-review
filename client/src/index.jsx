import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import httpRequest from './parse.js';

const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    console.log('refreshed');
    // Send a GET request to server
    // $.ajax({
    //   url: 'http://localhost:1128/repos',
    //   type: 'GET',
    //   contentType: 'application/json',
    //   success: (data) => {setRepos(data)},
    //   error: () => {console.log('Fail to send POST to server')}
    // });
    httpRequest.get((data) => {
      setRepos(data);
    })
  },[])


  const search = (term) => {
    // Term is a github username
    console.log(`${term} was searched`);
    // Send a POST request to server
    // $.ajax({
    //   url: 'http://localhost:1128/repos',
    //   type: 'POST',
    //   data: JSON.stringify({'username': term}),
    //   contentType: 'application/json',
    //   success: () => {console.log('successed sending POST to server')},
    //   error: () => {console.log('Fail to send POST to server')}
    // });
    httpRequest.post(term, function() {
      httpRequest.get(
        function (data) {
          setRepos(data);
        }
      )}
    )
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));