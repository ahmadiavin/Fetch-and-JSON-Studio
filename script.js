// TODO: add code here

window.addEventListener("load", function () {
  function getSortOrder(hoursInSpace) {
    return function (a, b) {
      if (a[hoursInSpace] > b[hoursInSpace]) {
        return 1;
      } else if (a[hoursInSpace] < b[hoursInSpace]) {
        return -1;
      }
      return 0;
    };
  }
  fetch("https://handlers.education.launchcode.org/static/astronauts.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      json.sort(getSortOrder("hoursInSpace"));
      const container = document.getElementById("container");
      let people = '';
      let count=0;
      for (let person of json) {
        let isActive = person.active;
        let liClass = '';
        if (isActive) {
          liClass = 'class="active"';
        }
        people +=
        `<div class="astronaut">
                <div class="bio">
                    <h3>${person.firstName} ${person.lastName}</h3>
                        <ul>
                            <li>Hours in space: ${person.hoursInSpace}</li>
                            <li><span ${liClass}>Active: ${person.active}</span></li>
                            <li>Skills: ${person.skills.join(', ')} </li>
                        </ul>
                </div>
                <img class="avatar" src="${person.picture}">
            </div>`;
            count++;
      }
      container.innerHTML = `<h5 class="astronaut-count">Total Astronauts: ${count}</h5>`+people;
    });
});
