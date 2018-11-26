window.onload = () => {
  document.getElementById('getTexts').addEventListener('click', getText);
  document.getElementById('getJSON').addEventListener('click', getUsers);
  document.getElementById('getAPI').addEventListener('click', getPosts);
  document.getElementById('addPost').addEventListener('submit', addPosts);
}

const getText = () => {

  fetch('./sample.txt')
    .then(res => res.text())
    .then(data => {
      document.getElementById('messages').innerHTML = data;
    })
    .catch(err => console.log(err));
}

const getUsers = () => {
  // fetch filename or api
  fetch('./users.json')
  // response => json/text
    .then(res => res.json())
    .then(data => {
      // turns in data => you can append to the html page
      let messages = '<h3>Users</h3>';
      data.forEach(user => {
        messages += `
        <ul>
          <li>Name: ${user.name}</li>
          <li>Age: ${user.age}</li>
          <li>Location: ${user.location}</li>
        </ul>
        `;
      });
      // make sure to .innerHTML and set to variable
      document.getElementById('messages').innerHTML = messages;
    })
    .catch(err => console.log(err));
}

const getPosts = () => {

  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => {
    let output = '<h2>Posts</h2>';
    data.forEach(post => {
      output += `
        <div>
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `;
    })
    document.getElementById('messages').innerHTML = output;
  })
}

const addPosts = (e) => {
  e.preventDefault();

  let title = document.getElementById('title').value;
  let body = document.getElementById('body').value;

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ title: title, body: body })
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

