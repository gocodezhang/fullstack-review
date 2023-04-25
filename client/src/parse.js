import $ from 'jquery';
import React from 'react';

const httpRequest = {
  get: function(callback) {
      console.log('Get request called');
      $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'GET',
      contentType: 'application/json',
      success: callback,
      error: () => {console.log('Fail to send POST to server')}
    })
  },
  post: function(term, callback) {
    console.log('Post request called');
    $.ajax({
    url: 'http://localhost:1128/repos',
    type: 'POST',
    data: JSON.stringify({'username': term}),
    contentType: 'application/json',
    success: callback,
    error: () => {console.log('Fail to send POST to server')}
  })
  }
}

export default httpRequest;
