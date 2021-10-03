let contacts = document.querySelector(".contacts");
let contributors = "";

fetch(
  "https://api.github.com/repos/lukes-code/Hacktoberfest-Spooks/contributors"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((user) => {
      contributors += `<div class="card">
      <a href="https://github.com/${user.login}" target="_blank">
			<img src=${user.avatar_url} alt="${user.login}">
			<div class="container">
      <h2>${user.login}</h2>
      Contact Now
			</div> 
      </a>
		</div>`;
    });
    contacts.innerHTML = contributors;
  })
  .catch((err) => console.error(err));
