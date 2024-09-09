document.getElementById("search-btn").addEventListener("click", function() {
  const query = document.getElementById("search-query").value;
  
  if (query.trim() === "") {
    alert("Please enter a search query");
    return;
  }

  fetch(`https://reqres.in/api/users?page=2&query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.getElementById("results");
      resultsContainer.innerHTML = ""; // Clear previous results

      data.data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = item.first_name;

        const type = document.createElement("div");
        type.className = "card-type";
        type.textContent = `Type: ${item.email}`;

        card.appendChild(title);
        card.appendChild(type);

        resultsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching search results:", error);
    });
});
