document.getElementById("popup-search-btn").addEventListener("click", function() {
  const query = document.getElementById("popup-search-query").value;
  
  if (query.trim() === "") {
    alert("Please enter a search query");
    return;
  }

  fetch(`https://reqres.in/api/users?page=2&query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.getElementById("popup-results");
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

document.getElementById("open-sidebar").addEventListener("click", function() {
  chrome.windows.create({
    url: "sidebar.html", // You’ll need to create the sidebar.html separately
    type: "popup",
    width: 400,
    height: 600,
    left: 0,
    top: 100
  });
});
