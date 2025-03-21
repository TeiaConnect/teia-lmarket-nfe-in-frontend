'use client';

import { useEffect } from 'react';

const FetchUser = () => {
  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => {
        if (!res.ok) {
          console.error('Problem with the request');
          return;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return null; // Esse componente não renderiza nada visível
};

export default FetchUser;
