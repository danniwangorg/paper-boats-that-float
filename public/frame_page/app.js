window.addEventListener("load", () => {

    fetch('/data')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //add a boat to the page
            let boats = data;
            let randomNum = Math.floor(Math.random() * boats.length);
            let randomBoat = boats[randomNum];
            document.getElementById("input-display").innerText = randomBoat.boat;
            document.getElementById("date-display").innerText = randomBoat.date;
            document.getElementById("loc-display").innerText = randomBoat.location;
        });
});