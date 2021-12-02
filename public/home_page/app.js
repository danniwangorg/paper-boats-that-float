let boatsCount;

window.addEventListener('load', () => {
    fetch('http://api.open-notify.org/iss-now.json')
        .then(response => response.json())
        .then(data => {
            boatsCount = data.iss_position.latitude;
            updateTime();
        })
})

function updateTime() {
    let container1 = select('#boatsNum');
    container1.html(boatsCount);
    setTimeout(reFetchData, 3000);
}

function reFetchData() {
    fetch('http://api.open-notify.org/iss-now.json')
        .then(response => response.json())
        .then(data => {
            boatsCount = data.iss_position.latitude;
            updateTime();
        })
}