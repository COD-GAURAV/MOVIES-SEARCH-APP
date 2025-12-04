
let searchArr = []
const searchInput = document.getElementById("searchInput")
function moviesSearch(mov , type){
    let movieUrl = `https://www.omdbapi.com/?${type}=${mov}&apikey=dd9e5d8`
    fetch(movieUrl).then((res)=> res.json())
    .then((data)=>{
        console.log(data)
        console.log(data.Search)
        searchArr.push(data)
        searchArr.shift()
        data.Search.forEach((search)=>{
            let moviesDiv = document.querySelector(".movies")
            //mainCard
            const movieCard = document.createElement("div")
            movieCard.classList.add("movie-card")
            // movieImage
            const movieImg = document.createElement("img")
            movieImg.classList.add("movieImg")
            movieImg.src = search.Poster
            // movieTitle
            const movieTitle = document.createElement("h3")
            movieTitle.classList.add("movieTitle")
            movieTitle.textContent = search.Title
            // releaseDate
            const releadeDate = document.createElement("p")
            releadeDate.classList.add("releaseDate")
            releadeDate.textContent = search.Year
            const imdbId = document.createElement("p")
            imdbId.textContent = search.imdbID
            imdbId.style.display = `none`
            
            
            movieCard.append(movieImg , movieTitle , releadeDate , imdbId)
            moviesDiv.append(movieCard)
            
        })
        const card = document.querySelectorAll(".movie-card")
        
        
        card.forEach((val)=>{
            val.addEventListener("click",(e)=>{
                searchArr.shift()
                const value = val
                console.log(movieUrl)
                console.log(value.childNodes[1].textContent)
                console.log(data.Search[0].imdbID)
                moviesSearch(value.childNodes[3].textContent,"i")
                searchArr.push(data)
                console.log(data)
                console.log(searchArr)
                console.log(searchArr[0].Year)
               setTimeout(function(){
                    document.getElementById("container-2").style.display="flex"
                    document.querySelector(".container").style.display="none"
                    const searchArrAccess = searchArr[0]
                    document.querySelector(".title").textContent = searchArrAccess.Title
                    document.querySelector(".tagline").textContent = `Awards✨: ${searchArr[0].Awards}`
                    document.querySelector(".overview").textContent = searchArrAccess.Plot
                    document.getElementById("poster").src = searchArr[0].Poster
                    // info section
                    document.getElementById("rating").innerHTML = `<strong>⭐ Rating:</strong> ${searchArr[0].imdbRating}`
                    document.getElementById("gen").innerHTML = `<strong>🎭 Genre:</strong> ${searchArr[0].Genre}`
                    document.getElementById("time").innerHTML = `<strong>⏳ Duration:</strong> ${searchArr[0].Runtime}`
                    document.getElementById("resDate").innerHTML = `<strong>📅 Release Date:</strong> ${searchArr[0].Released}`
                    document.getElementById("lang").innerHTML = `<strong>🌍 Language:</strong> ${searchArr[0].Language}`
                    document.querySelector(".cast-list").textContent = searchArr[0].Actors
                    // writer name
                    document.getElementById("Writer").textContent = searchArr[0].Director
               },3000)
            })
        })
        
        
        
    }).catch((err)=>{
        console.log("not found")
    })
    
    
}

moviesSearch("the avengers","s")

const form = document.getElementById("form")

form.addEventListener("submit",(e)=>{
    document.querySelector(".movies").innerHTML = ""
    e.preventDefault()
    let searchValue = searchInput.value
    moviesSearch(searchValue,"s")
    console.log(searchValue )
})


searchInput.addEventListener("input",(e)=>{
})


