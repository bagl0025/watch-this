// Add a new show
async function showFormHandler(event) {
   event.preventDefault();

   const shows_text = document
      .querySelector('textarea[name="shows-body"]')
      .value.trim();
   const watchlist_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
   ];

   if (shows_text) {
      const response = await fetch("/api/shows", {
         method: "POST",
         body: JSON.stringify({
            watchlist_id,
            shows_text,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      });

      if (response.ok) {
         document.location.reload();
      } else {
         alert(response.statusText);
      }
   }
}

document
   .querySelector(".shows-form")
   .addEventListener("submit", showFormHandler);
