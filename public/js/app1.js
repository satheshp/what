const f = document.querySelector('form');
const n = document.querySelector('input[name="number"]');

const resultContainer = document.getElementById('result-container');
const msg = document.getElementById('message');
let imgTag; 

f.addEventListener('submit', (e) => {
    e.preventDefault();
    const nv = n.value;
    

    // Check if there's an existing img tag in the resultContainer and remove it
    if (imgTag) {
        resultContainer.removeChild(imgTag);
    }

    fetch('/num?number=' + nv)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
            // Create a new div element to contain the fetched HTML
            const containerDiv = document.createElement('div');
            containerDiv.innerHTML = data.st;
            msg.style.display = 'none';
            // Find the <img> element within the containerDiv
            imgTag = containerDiv.querySelector('img');

            if (imgTag) {
                // Append the imgTag to the resultContainer
                resultContainer.appendChild(imgTag);
                // Show the resultContainer
                resultContainer.style.display = 'flex';
            } else {
                // Handle the case where the imgTag was not found
                console.log('Image not found');
                // Hide the resultContainer
                resultContainer.style.display = 'none';
            }
        }).catch((error)=>{
            msg.innerHTML = "invalid number";
            //console.log(error)
            msg.style.display = 'block';
        });
});
