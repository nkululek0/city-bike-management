jQuery(function() {
    const classDisable = "disable";
    const classActive = "active";
    
    const $dashboardTabButton = $(".dashboard-tab-button");
    const $bookingsTabButton = $(".bookings-tab-button");
    
    const $dashboardContentSection = $(".dashboard-content");
    
    const $bookingsContentSection =  $(".bookings-content");
    const $hubsListSection = $(".bookings-content .hub-options-section");
    const $bikesListContainer = $(".bookings-content .bike-list-container");
    
    $bookingsTabButton.on("click", async function () {
        // Button colour update
        $dashboardTabButton.removeClass(classActive);            
        $(this).addClass(classActive);
    
        // Content Update
        $dashboardContentSection.addClass(classDisable);
        $bookingsContentSection.removeClass(classDisable);
    
        _setHubListHtmlContent();
    
        _setBikeList();
        _prepareAndSetBikeListHtmlContent();
    });
    
    $bookingsContentSection.on("click", ".hub", function () {
        $(`.bookings-content .hub.${classActive}`).removeClass(classActive);
        $(this).addClass(classActive);
    
        const selectedHubID = Number($(this).attr("attr-hub-id"));
    
        _setBikeListHtmlContent(selectedHubID);
    });
    
    const _bikeListData = {
        allBikes: [],
        bikeListIsSet: false
    }
    
    const _setHubListHtmlContent = async () => {
        $hubsListSection.html("");
    
        try {
            let response = await fetch("/bookings/hub", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
    
            let data = await response.json();
            let hubs = data.hubs;
    
            if (hubs.length > 0) {
                hubs.forEach((hub) => {
                    $hubsListSection.append(`
                        <p class="hub" attr-hub-ID="${ hub.ID }">${ hub.Name }</p>
                    `);
                }); 
            }
    
            $hubsListSection.prepend("<p class='hub active' attr-hub-ID='0'>All</p>");
        }
        catch (error) {
            console.log(error);
        }
    }
    
    const _setBikeList = async () => {
        try {
            let response = await fetch("/bookings/bike", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
    
            let data = await response.json();
            let bikes = data.bikes;
    
            if (bikes.length > 0) {
                _bikeListData.allBikes = bikes;
            }
    
            _bikeListData.bikeListIsSet = true;
        } 
        catch (error) {
            console.log(error);
        }
    }
    
    const _prepareAndSetBikeListHtmlContent = (hubID) => {
        if (!_bikeListData.bikeListIsSet) {
            let bikeListInterval = setInterval(() => {
                if (_bikeListData.bikeListIsSet) {
                    clearInterval(bikeListInterval);
                    _setBikeListHtmlContent(hubID);
                }
            }, 100);
        }
        else {
            _setBikeListHtmlContent(hubID);
        }
    }
    
    const _setBikeListHtmlContent = (hubID) => {
        $bikesListContainer.html("");
    
        let bikes = _bikeListData.allBikes;
        let noBikesContent = `<h3 class="no-bikes">No Bikes to Show</div>`;
    
        if (bikes.length > 0) {
            if (hubID && hubID > 0) {
                bikes = bikes.filter((bike) => bike.HubID == hubID);
    
                if (bikes.length > 0) {
                    appendBikes();
                }
                else {
                    $bikesListContainer.html(noBikesContent);
                }
            } 
            else {
                appendBikes();
            }
        }
        else {
            $bikesListContainer.html(noBikesContent);
        }
    
        function appendBikes () {
            bikes.forEach((bike) => {
                $bikesListContainer.append(`
                    <div class="bike">
                        <div class="bike-content">
                            <div class="upper-section">
                                <img src="/images/bikes${ bike.PictureURL }" alt="picture of bike" class="bike-picture">
                                <div class="bike-status-container">
                                    <p class="bike-status ${ bike.Status }">${ bike.Status }</p>    
                                </div>    
                            </div>
                            <div class="lower-section">
                                <p class="bike-name">${ bike.Name }</p>
                            </div>
                        </div>
                        <div class="bike-content-overlay">
                            ${ bike.Status == "available" ?  `<p class='book-bike'><a href='#datepicker' rel='modal:open' attr-bike-hub-ID='${ bike.HubID }' attr-bike-ID='${ bike.ID }' attr-bike-Name='${ bike.Name }'>Book</a></p>` : "<p class='unavailable-bike'>This Bike is Booked!</p>" }
                        </div>
                    </div>
                `);
            });
        }
    }
});