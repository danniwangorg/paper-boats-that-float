//Select for all the buttons
let navButtons= document.getElementsByClassName('nav-button');
console.log(navButtons)

//Hide all of the content first
let allContent = document.getElementsByClassName('content');
        for ( let j = 0; j < allContent.length; j++){
            allContent[j].style.display = "none";
        }
//Attach an event listener to all of the buttons
for (let i = 0; i < navButtons.length; i++){ 
    
  
    navButtons[i].addEventListener('click', function(evt){

        console.log("a button was clicked!");
        console.log(evt.target.id); 
        
       //Hide all of the content first
        let allContent = document.getElementsByClassName('content');
        for ( let j = 0; j < allContent.length; j++){
        allContent[j].style.display = "none";
        }   

        //Create the specific content ID
        let contentID = "content-"+ evt.target.id;

        //show the specific content
        let contentToShow = document.getElementById(contentID);
        contentToShow.style.display = "block";
    }) 
   
}