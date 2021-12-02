window.addEventListener("load", () => {

    fetch('/latest_data')
        .then(response => response.json())
        .then(data => {
            let boatsCount = data;
            let boatsNum = document.getElementById('boatsNum');
            boatsNum.append(boatsCount.boat);
        })
});