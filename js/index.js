
/* ------------fetch data load------------- */
const universeLoadData = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then((res) => res.json())
    .then((data) => showUniversel(data.data.tools, dataLimit))
}
const showUniversel = (universeData, dataLimit) => {
        const btnSeeMore = document.getElementById('btn-see-more');
        if(dataLimit && universeData.length > 10){
            universeData = universeData.slice(0, 6)
            btnSeeMore.classList.remove('d-none');
        }else{
            btnSeeMore.classList.add('d-none');
        }
        const universeContainer = document.getElementById('universe-container');
        universeContainer.innerText = '';
        universeData.forEach(universe => {
        const {image, features, name, published_in, id} = universe;
        const universeDiv = document.createElement('div');
        universeDiv.classList.add('col')
        universeDiv.innerHTML = `
                <div class="card p-3">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                <li>${features[0]}</li>
                <li>${features[1]}</li>
                <li>${features[2] ? features[2] : ''}</li>
                </ol>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <div>
                    <h5>${name}</h5>
                    <div class="d-flex gap-3">
                        <p><i class="fa-solid fa-calendar-days"></i></p>
                        <p>${published_in}</p>
                    </div>
                    </div>
                    <div>
                        <i class="fa-solid fa-arrow-right text-danger" onclick="fetchUniverseId('${id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
                </div>
            </div>
        `
        universeContainer.appendChild(universeDiv)
        // stop loader
        toggleSpinner(false);
    })
}
document.getElementById('btn-see-more').addEventListener('click', function(){
    // start loader 
    toggleSpinner(true);
    universeLoadData()
});
/* loader load */
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }else(
        loaderSection.classList.add('d-none')
    )
}

/* --------card modal ----------- */
const fetchUniverseId = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => showUniverseId(data.data))
}
const showUniverseId = universe => {
    console.log(universe.features)
    // const  featureName = universe.features.map(feature => feature.features_name);
    // console.log(featureName);
    const {description, pricing, features,integrations, image_link, input_output_examples, accuracy} = universe;
    document.getElementById('modal-body').innerHTML = `
        <div class="d-flex justify-content-center align-items-center p-5">
            <div class="w-50 mx-1 bg-warning bg-opacity-25 rounded p-3">
                <div class="fw-bolder">${description}</div>
                <div  class="d-flex justify-content-between my-5"> 
                    <div class="text-success fw-bold bg-white p-3 rounded">
                        <div>${pricing[0].price ? pricing[0].price : 'free of cost'}</div>
                        <div>${pricing[0].plan}</div>
                    </div>
                    <div class="text-warning fw-bold bg-white p-3 rounded">
                        <div>${pricing[1].price ? pricing[1].price : 'free of cost'}</div>
                        <div>${pricing[1].plan}</div>
                    </div>
                    <div class="text-danger fw-bold bg-white p-3 rounded">
                        <div>${pricing[2].price ? pricing[2].price : 'free of cost'}</div>
                        <div>${pricing[2].plan}</div>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div>
                        <h6>Features</h6>
                        <ul>
                            <li>${features.features_name}</li>
                            <li>${features.features_name}</li>
                            <li>${features.features_name}</li>
                        </ul>
                    </div>
                    <div>
                    <h6>Integrations</h6>
                        <ul>
                            <li>${integrations[0] ? integrations[0] : 'no data found'}</li>
                            <li>${integrations[1] ? integrations[1] : 'no data found'}</li>
                            <li>${integrations[2] ? integrations[2] : 'no data found'}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="w-50 mx-1 p-3">
                <div class="d-flex justify-content-end">
                    <h4><span class="badge text-bg-danger">${accuracy.score ? accuracy.score : 'no accuracy'}'% accuracy'</span></h4>
                </div>
                <div>
                    <img class="img-fluid" src="${image_link[0]}" alt="">
                    <h4 class="text-center">${input_output_examples[0].input}</h4>
                    <p class="text-center">${input_output_examples[0].output ? input_output_examples[0].output : 'No! Not Yet! Take a break'}</p>
                </div>
            </div>
            <div>
                <div class="d-flex align-items-center justify-content-end" style="margin-right: -80px; margin-top: -310px;">
                    <button type="button" class="btn btn-danger rounded-circle " data-bs-dismiss="modal"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
        </div>
        
    `  
}
universeLoadData(6);






