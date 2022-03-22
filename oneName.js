
        const btn = document.getElementById("button");
        const input = document.querySelector("#nameInput");
        btn.addEventListener("click", newFunction)

        function newFunction(event) {

            let nameValue = this.previousElementSibling.value;
            const URL = `https://api.nationalize.io/?name=${nameValue}`;
     

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
                        document.getElementById("solutionInfo").innerHTML += probArray[i] + " probability to be in " + countryArray[i] + ", ";
                    }
                })
                .catch(function (error) {
                    console.log("error is", error)
                })
        }