// Laod Movies when the document is loaded
window.addEventListener('load', (event) => {
    removeMovie();
    getMovie("2021")
  });

// Declaring Search and Reset buttons
const search = document.querySelector("#search")
const reset = document.querySelector("#reset")

// Serach button click event
search.addEventListener("click",function(){
    console.log("Search Button Clicked")
   
    // If there was a error message clear the message
    document.getElementById('error').innerHTML="";
    
    const movieyear = document.querySelector("#movieyear").value
    checkmovie(movieyear) // Check the value entered

})

// Reset button click event
reset.addEventListener("click",function(){
    console.log("Reset Buttom Clicked")
    
    // Set the sub heading
    const yearheading = document.querySelector("#year-heading")
    yearheading.innerHTML=`Enter the year and Click on Search to get the list of movies`
   
    // Remove Movie cards
    removeMovie();
})

// Funciton to check the input value of the year entered
function checkmovie(movieyear){

const errmsg = document.querySelector('#error')
// Check if the input field is empty
if (movieyear == "") {
     errmsg.innerHTML = "The year should not be empty"
  } 
  // If the year eneterd is between 1900 and the current year
   else if (movieyear > new Date().getFullYear() || movieyear < 1900)  {
    errmsg.innerHTML = `The year you entered should  be between 1900 and the current year ${new Date().getFullYear()}`
  }
  else {
    // Remove previous movie cards and fetch movies for the year entered
    removeMovie(); 
    getMovie(movieyear) 
}

}


// Function to remove Movie Cards
function removeMovie(){
    const moviecards = document.querySelectorAll(".mvcard")
     for(const movie of moviecards){
       movie.remove(); 
    }
}

// Funciton to fetch mcvies from the TMDb
function getMovie(movieyear){
    console.log(movieyear)

    const showyear = document.querySelector("#year-heading")
    showyear.innerHTML=`Showing the popular movies of the year : ${movieyear}`
 

    // Fetch movie from the Tmdb
    const apiurl = `https://api.themoviedb.org/3/discover/movie?api_key=7652452df82ba14786973f2884922822&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${movieyear}&with_watch_monetization_types=flatrate`
  fetch(apiurl)
  .then(response => response.json())
  .then(data => topten(data));
}


//Function to process the top 10 moives
function topten(api_movielist){
    //Truncate the array to 10 items and display each array item 
    const topten_movies = api_movielist.results.slice(0,10);
    console.log(topten_movies)
    topten_movies.forEach(createMvcards);

}



// Function to create movie cards
function createMvcards(movie){
   const movielist = document.querySelector(".movie-list")
   
    const mvcard= document.createElement('div');
    mvcard.classList.add("mvcard")

    // Movie card Image element
    const mv_image = document.createElement('img')
    const mv_image_base_url = "https://image.tmdb.org/t/p/w342/"
        //-- check if the image poster is available if not put a placeholder image
     mv_image.src= movie.poster_path == null ? `https://via.placeholder.com/350`: mv_image_base_url + movie.poster_path

     // Movie card body element
    const mvcard_body= document.createElement('div');
    mvcard_body.classList.add("mvcard-body")

    // Movie card title element creation
    const mvcard_title_element = document.createElement("h2")
    const mvcard_title_text = document.createTextNode(`${movie.title}`);
    mvcard_title_element.appendChild(mvcard_title_text)

    // Movie card release date element creation
    const mvcard_release_date_element = document.createElement("h4")
    const mvcard_release_date_text = document.createTextNode(`Released Date : ${movie.release_date}`);
    mvcard_release_date_element.appendChild(mvcard_release_date_text)

    // Movie card body description element creation
    const mvcard_description_element = document.createElement("p")
    const mvcard_description_text = movie.overview == "" ? document.createTextNode('The description is not availabe for the movie we apologise for the inconvinence.'):document.createTextNode(`${movie.overview}`);
    mvcard_description_element.appendChild(mvcard_description_text)

    // Appending the elements created
    mvcard_body.append(mvcard_title_element,mvcard_release_date_element,mvcard_description_element)
    mvcard.append(mv_image,mvcard_body)
    movielist.appendChild(mvcard);

}