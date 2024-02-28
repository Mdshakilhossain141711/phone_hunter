const loadPhone = async (searchValue, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone_container");
    phoneContainer.textContent = " ";

    const showAllBtn = document.getElementById("showAllBtn");
    if (phones.length > 12) {
        showAllBtn.classList.remove("hidden");
    } else {
        showAllBtn.classList.add("hidden");
    }



    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {

        const phoneCard = document.createElement("div");
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <div class="card-actions">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
            </div>
        </div>
        
        `

        phoneContainer.appendChild(phoneCard);
    });
    toggleLoading(false);
}

const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const details = data.data;
    showPhoneDetails(details);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const detailsContainer = document.getElementById("detailsContainer");
    detailsContainer.innerHTML = `
    <img src="${phone?.image}"  alt="" />
    <h3 class="font-bold text-lg">${phone?.name}</h3>
            <p class="py-4"></p>
    `

    my_details_modal.showModal();
}


const handleSearch = (isShowAll) => {
    toggleLoading(true);
    const searchField = document.getElementById("search_field");
    const searchValue = searchField.value;
    loadPhone(searchValue, isShowAll);
}


const toggleLoading = (isLoading) => {
    const loading = document.getElementById("loading");
    if (isLoading) {
        loading.classList.remove("hidden");
        loading.classList.add("flex");
    } else {
        loading.classList.remove("flex");
        loading.classList.add("hidden");
    }
}

const handleShowAll = () => {
    handleSearch(true);
}