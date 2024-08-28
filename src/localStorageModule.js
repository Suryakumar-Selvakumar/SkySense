function storeProjectsArray(projectsArray) {
  localStorage.setItem("projectsArray", JSON.stringify(projectsArray));
}

function retrieveProjectsArray() {
  return JSON.parse(localStorage.getItem("projectsArray"));
}

function storeDateProjectsArray(dateProjectsArray) {
  localStorage.setItem("dateProjectsArray", JSON.stringify(dateProjectsArray));
}

function retrieveDateProjectsArray() {
  return JSON.parse(localStorage.getItem("dateProjectsArray"));
}

export {
  storeProjectsArray,
  retrieveProjectsArray,
  storeDateProjectsArray,
  retrieveDateProjectsArray,
};
