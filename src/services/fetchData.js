const apiKey = '07343b6896a74d57920afd88bed1a68f';

// const fetchData = url => {
//   fetch(url, {
//     method: 'get',
//     headers: new Headers({
//       'X-Auth-Token': apiKey
//     })
//   })
//     .then(res => res.json())
//     .then(data => {
//       return new Promise;
//     })
//     .catch(err => console.error(err));
// };

// export default fetchData;

const fetchData = (params, state, stateParam) => {
  fetch('http://api.football-data.org/v2/' + params, {
    method: 'get',
    headers: new Headers({
      'X-Auth-Token': apiKey
    })
  })
    .then(data => data.json())
    .then(data => {
      state(function(state) {
        return { [stateParam]: data };
      });
    })
    .catch(err => console.log(err));
};
