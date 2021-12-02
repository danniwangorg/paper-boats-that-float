let imgdataUrl;

window.addEventListener("load", () => {

    let boatButton = document.getElementById("collect-btn");
    boatButton.addEventListener('click', () => {

        // store the description, date, location, image
        let boatInput = document.getElementById("boat-input").value;

        let boatInputObj = { "boat": boatInput };
        boatInputObj.date = document.getElementById("boat-date").value;
        boatInputObj.location = document.getElementById("boat-loc").value;

        boatInputObj.image = imgdataUrl;
        console.log(boatInputObj.image);

        let boatInputJSON = JSON.stringify(boatInputObj);
        console.log(boatInputJSON);

        fetch("/boats", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: boatInputJSON
            })
            .then(response => response.json())
            .then(data => {
                console.log("Did this work?");
                console.log(data);
            })
    });
});

let openFile = function(file) {
    let input = file.target;

    let reader = new FileReader();
    reader.onload = function() {
        let dataURL = reader.result;
        let output = document.getElementById('boat-output');
        output.src = dataURL;
        imgdataUrl = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
};