// Exemple d'appel API depuis un composant React
export const saveTracking = (bottles:number, diapers:number, breastPumping:number ) => fetch('http://localhost:5000/api/tracking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bottles, diapers, breastPumping }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));

// Exemple d'appel API depuis un composant React
// frontend/src/api.ts
export const getTracking = () => {
  return fetch('http://localhost:5000/api/tracking', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
};

