window.addEventListener("load", () => {

    fetch('/latest_data')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // let boatData = data[0];
            let boatData = data;
            let InputDisplay = document.getElementById('input-display');
            InputDisplay.append(boatData.boat);
            let DateDisplay = document.getElementById('date-display');
            DateDisplay.append(boatData.date);
            let LocDisplay = document.getElementById('loc-display');
            LocDisplay.append(boatData.location);
        })
});


// window.addEventListener("load", () => {

//     fetch('/data')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             //add a boat to the page
//             let boats = data[0];
//             let randomNum = Math.floor(Math.random() * boats.length);
//             let randomBoat = boats[randomNum];
//             document.getElementById("input-display").innerText = randomBoat;
//         });
// });

// window.addEventListener("load", () => {
//     //Make a request for boats data
//     fetch("/data")
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)

//             //add a boat to the page
//             let quotes = data.quotes;
//             let randomNum = Math.floor(Math.random() * quotes.length);
//             let randomQuote = quotes[randomNum];
//             console.log(randomQuote);
//             document.getElementById("life-quote").innerText = randomQuote;
//         });

// });s