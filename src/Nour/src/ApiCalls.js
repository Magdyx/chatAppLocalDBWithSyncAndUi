import React from 'react';
import axios from 'axios';

const POST = (object, URL, func) => {
  axios.post(`${URL}`, object)
  .then(function (response) {
    func(response , true);
  })
  .catch(function (error ) {
    func(error , false);
  });
};

const GET = (URL,func) => {
  axios.get(`${URL}`)
  .then(function (response) {
    func(response);
  })
  .catch(function (error) {
    func(error);
  });
}

export {GET, POST};
