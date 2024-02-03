// exercise API data
const HOME_EXERCISE_URL =
  "https://exercisedb.p.rapidapi.com/exercises?limit=10";
const EXERCISE_FETCH_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "26242167c6msh153608f98cd81dap11c5f9jsn1d7c070a6451",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

let exercisesData = [];

const loadExercisesData = async () => {
  const storedExercises = localStorage.getItem("exercises");

  if (storedExercises) {
    exercisesData = JSON.parse(storedExercises);
    console.log("Exercises loaded from local storage", exercisesData);
    handleLoadedExercises(exercisesData);
  } else {
    try {
      const response = await fetch(HOME_EXERCISE_URL, EXERCISE_FETCH_OPTIONS);
      const data = await response.json();
      exercisesData = data;

      localStorage.setItem("exercises", JSON.stringify(exercisesData));
      console.log(exercisesData);
      handleLoadedExercises(exercisesData);
    } catch (error) {
      console.error(error);
    }
  }
};
// load exercises data and make it available as soon as the page loads
window.addEventListener("load", loadExercisesData);

const handleLoadedExercises = (exercises) => {
  console.log("execises after loading", exercises);

  updateHomeExercisesDom(exercises);
};

const updateHomeExercisesDom = (exercises) => {
  // exercises section
  const exercisesContainer = document.getElementById("exercises-container");

  // create exercise-items in html usng exercises array
  exercises.forEach((exercise) => {
    // console.log(exercise.name);
    const exerciseItem = document.createElement("li");
    exerciseItem.classList.add("exercise_item");

    const exerciseAnchor = document.createElement("a");

    const gifDiv = document.createElement("div");
    gifDiv.classList.add("exercise_gif");
    const gifImg = document.createElement("img");
    gifImg.setAttribute("src", exercise.gifUrl);
    gifDiv.appendChild(gifImg);

    const tagsDiv = document.createElement("div");
    tagsDiv.classList.add("exercise_tags");
    const firstTag = document.createElement("p");
    const secondTag = document.createElement("p");
    firstTag.textContent = exercise.bodyPart;
    secondTag.textContent = exercise.target;

    tagsDiv.appendChild(firstTag);
    tagsDiv.appendChild(secondTag);

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("exercise_name");
    const name = document.createElement("h4");
    name.textContent = exercise.name;
    nameDiv.appendChild(name);

    exerciseAnchor.appendChild(gifDiv);
    exerciseAnchor.appendChild(tagsDiv);
    exerciseAnchor.appendChild(nameDiv);

    exerciseItem.appendChild(exerciseAnchor);
    exercisesContainer.appendChild(exerciseItem);
  });
};
