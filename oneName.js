//NOTE: PAGE NEEDS TO BE REFRESHED IF YOU WANT TO TEST A NEW NAME TO CLEAR THE INPUT!!


const btn = document.getElementById("button");
const input = document.querySelector("#nameInput");
btn.addEventListener("click", newFunction)

function newFunction(event) {

    let nameValue = this.previousElementSibling.value;
    const URL = `https://api.nationalize.io/?name=${nameValue}`;
    var namesArray = [];
    namesArray = nameValue.split(",");
    console.log(namesArray);


    fetch(URL)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject('something went wrong')
        })
        .then(function (data) {

            const returnName = data.name;

            document.getElementById("solutionName").innerHTML = returnName.toUpperCase() + " has got:";
            const countryArray = [];
            const probArray = [];
            for (let i = 0; i < 3; i++) {

                countryArray.push(data.country[i].country_id);
                probArray.push(data.country[i].probability.toFixed(3));
                if (i === 2){ // added an if condition so I don't append a comma to the last country
                    document.getElementById("solutionInfo").innerHTML += probArray[i] + " probability to be in " + countryArray[i];
                } else {
                    document.getElementById("solutionInfo").innerHTML += probArray[i] + " probability to be in " + countryArray[i] + ", ";

                }               
            }
        })
        .catch(function (error) {
            console.log("error is", error)
    })
}