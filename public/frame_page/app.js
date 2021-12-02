window.addEventListener("load", () => {

    fetch('/data')
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