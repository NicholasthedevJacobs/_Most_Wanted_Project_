"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults = "";
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchMultipleCriteria(people); // searchByCriterion(people);
      // TODO: search by traits
      break;
    default:
      app(people); // restart app
      break;
  }

  //if(searchResults.length > 1){//use jose displayperson in the for loop
    //for(let i = 0; i < searchResults.length; i++){
      //let keepSearching = promptFor("Found " + searchResults[i].firstName + " " + searchResults[i].lastName + " . Would you like to continue searching? Enter 'yes' or 'no'", yesNo).toLowerCase();
      //switch(keepSearching){
       // case 'yes':
         // searchResults = searchMultipleCriteria(searchResults);
         // break;
       // case 'no':
        //  break;
     // }
    //}
  //}
  

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  // Else display all people returned
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  // for(let i = 0; i < person.length; i++){
  //   let keepSearching = promptFor("Found " + person[i].firstName + " " + person[i].lastName + " . Would you like to continue searching? Enter 'yes' or 'no'", yesNo).toLowerCase();
  //   switch(keepSearching){
  //     case 'yes':
  //       person = searchMultipleCriteria(person);
  //       break;
  //     case 'no':
  //       break;
  //  }
  // }

  
  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");//callback?

  switch(displayOption){
    case "info":
    displayPerson(person)
    break;
    case "family":
    displayFamilyMembers(person, people)
    
    break;
    case "descendants":
     let descendants =  displayDescendants(person, people)
     displayPerson(displayDescendants(person, people));
    
    for(let i = 0; i < descendants.length; i++){
      displayPerson(displayDescendants(person[i], descendants))
    }
    //displayPerson(descendants);
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByCriterion(people){
  let searchType = prompt("Enter the criterion that you are interested in finding the person by.  Enter 'gender', 'date of birth', 'height', 'weight', 'eye color', 'occupation'");
  let searchResults = "";
  switch(searchType.toLowerCase()){
    case 'gender':
      searchResults = searchByGender(people);
      console.log(searchResults);
      break;
    case 'date of birth':
      searchResults = searchByDOB(people);
      console.log(searchResults);
      break;
    case 'height':
      searchResults = searchByHeight(people);
      console.log(searchResults);
      break;
    case 'weight':
      searchResults = searchByWeight(people);
      console.log(searchResults);
      break;
    case 'eye color':
      searchResults = searchByEyeColor(people);
      console.log(searchResults);
      break;
    case 'occupation':
      searchResults = searchByOccupation(people);
      console.log(searchResults);
      break;
    default:
      app(people); // restart app
      break;
  }
  return searchResults;

}



function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", chars);
  
  let foundPerson = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

function searchByDOB(people){
  let dob = promptFor("What is the person's Day of Birth?", chars);
  
  let foundPerson = people.filter(function(person){
    if(person.dob === dob){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

function searchByHeight(people){
  let height = promptFor("What is the person's Height?", chars);
  
  let foundPerson = people.filter(function(person){
    if(person.height == height){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

function searchByWeight(people){
  let weight = promptFor("What is the person's weight?", chars);
  
  let foundPerson = people.filter(function(person){
    if(person.weight == weight){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  
  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", chars);
  
  let foundPerson = people.filter(function(person){
    if(person.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

function searchByParents(person, people){
  let personParents = "";

  if(person[0].parents == undefined){
    return false;
  }
 
  else if (person[0].parents.length == 1){
    personParents = people.filter(function(el){
      if(person[0].parents[0] === el.id){
        return true;
      }
      else{
        return false;
      }
    })

  }

  else if(person[0].parents.length == 2){
    personParents = people.filter(function(el){
      if(person.parents[0] === el.id && person.parents[1] === el.id){
        return true;
      }
      else{
        return false;
      }
      
    })
    //return personParents;  
  }
  return personParents;
}

function searchByCurrentSpouse(person, people){

  let personSpouse = "";
  if(person[0].currentSpouse == undefined){
    return false;
  }
 
  else if (person[0].currentSpouse != null){
    personSpouse = people.filter(function(el){
      if(person[0].currentSpouse === el.id){
        return true;
      }
      else{
        return false;
      }
    })
    return personSpouse;
  }

  
  
  
  
  //return personSpouse;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = prompt("First Name: " + person[0].firstName + "\n" + "Last Name: " + person[0].lastName + "\n" + 
  "Gender: " + person[0].gender + "\n" + "DOB: " + person[0].dob + "\n" + "Height: " + person[0].height + "\n" + "Weight: " + person[0].weight + "\n"
  + "Eye Color: " + person[0].eyeColor + "\n" + "Occupation: " + person[0].occupation + "\n");
 
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayFamilyMembers(person, people) {
  let displayFamily = "";
  let parents = searchByParents(person, people);
  let spouse = searchByCurrentSpouse(person, people);
  let sibling = searchForSibling(person, people);
  if (parents != null) {
    displayFamily = prompt("Parents name is " + parents[0].firstName + " " + parents[0].lastName);
    
  }
  else {
    displayFamily = prompt("No Parents Found");
  }
  if (spouse != null) {
    displayFamily = prompt("Spouse: " + spouse[0].firstName + " " + spouse[0].lastName + "\n");
  }
  else {
    displayFamily = prompt("No Spouse Found");
  }
  if (sibling != null && sibling == 1) {
    displayFamily = prompt("Siblings: " + sibling[0].firstName + " " + sibling[0].lastName + "\n");
  }
  else if(sibling != null && sibling.length == 2){
    displayFamily = prompt("Sibling one is named: " + sibling[0].firstName + " " + sibling[0].lastName + "\n" + " and sibling two is named " + sibling[1].firstName + " " + sibling[1].lastName);
  }
  else {
    displayFamily = prompt("No Siblings Found");
  }
  //alert(displayFamily);

}

function searchForSibling(person, people) {
  for (let i = 0; i < person[0].parents.length; i++) {
    if (person[0].parents[i] != undefined) {
      var searchForSibling = people.filter(function(el) {
        if (person[0].parents[i] === el.parents[0] || (person[0].parents[i] === el.parents[0] && person[0].parents[i] === el.parents[1]) && person[0].id !== el.id) {
          return true;
        }
        else {
          return false;
        }
      })   
  }  
  }
  return searchForSibling;
}



// function lookUpDescendants(person, people){

//   let personChildren = "";
//   let countdown = lookUpDescendants(person, people){
//     if ()
//   }
//   let personParent = searchByParents(person, people);
//   let personGrandParent = searchByParents(personParent, people);
//   let counter = 3;
 
  

//   if(counter > 0){
//     personParent = lookUpDescendants(personGrandParent, people);
//     personChildren = lookUpDescendants(personParent, people);
//   }
// }


function displayDescendants(person, people) {
  var personChildren = [];
  var counter = 0;  

  let foundPeople = people.filter(function (el) {
    if (person.id === el.parents[0] || person.id === el.parents[1]) {
      personChildren.push(el);
      return true;
    }
    else {
      return false;
    }
  })
  for (var i = counter; i < personChildren.length; i++) {
    counter++;
    displayDescendants(personChildren[i], people);
  }
  return personChildren;
}



function searchMultipleCriteria(arrayOfCharacteristics){//test this
  //let arrayOfCharacteristics = "";
  let keepSearching = true;
  let numberOfSearches = 1;
  while(keepSearching = true){
// && numberOfSearches == 1 || (numberOfSearches >= 2 && numberOfSearches < 5)){//ask for user input to change search to false, as long as they are between 2-5
    while(arrayOfCharacteristics.length > 1){
      arrayOfCharacteristics = searchByCriterion(arrayOfCharacteristics);
      //print out the persons name
      let answer = prompt("Would you like to keep searching?  Yes or No.").toLowerCase();
      if (answer == 'yes'){
        keepSearching = true;
        arrayOfCharacteristics = searchByCriterion(arrayOfCharacteristics);
        numberOfSearches += 1;
      }
      else{
        keepSearching = false;
      }
      if (numberOfSearches >= 5){
        keepSearching = false;
      }   
      
    }
    return arrayOfCharacteristics;
  }
  return searchForSibling;
}


// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

