async function editFormHandler(event) {
  event.preventDefault();

  console.log('1');
  const title = document
    .querySelector('input[name="watchlist-title"]')
    .value.trim();
  console.log('2');

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  console.log('3');

  const response = await fetch(`/api/watchlists/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('4');

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.edit-watchlist-form')
  .addEventListener('submit', editFormHandler);
