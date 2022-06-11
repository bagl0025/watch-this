async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="watchlist-title"]').value;

  // dont have post url this could be changed to something else or deleted
  //const post_url = document.querySelector('input[name="post-url"]').value;

  const response = await fetch(`/api/watchlists`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      //post_url, ///remove ?
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log("what is going on?")

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {   
    alert(response.statusText);
  }
}

document
  .querySelector('.new-watchlist-form')
  .addEventListener('submit', newFormHandler);
