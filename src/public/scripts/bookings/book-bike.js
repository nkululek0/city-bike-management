jQuery(function() {
    const $bookingsContentSection =  $(".bookings-content");

    const bookingsContentSectionSelector = ".bookings-content";
    const bookBikeButtonSelector = ".book-bike a";

    const bikeBookingDatepickerModalSelector = ".jquery-modal.blocker.current";
    const bikeBookingDatepickerFormSelector = `${ bikeBookingDatepickerModalSelector } #bike-booking-datepicker-form`;
    const bikeBookNameFormFieldSelector = `${ bikeBookingDatepickerModalSelector } #bike-name`;
    const bikeBookHubFormFieldSelector = `${ bikeBookingDatepickerModalSelector } #bike-hub`;
    const bikeBookStartDateSelector = `${ bikeBookingDatepickerModalSelector } #start-date`;
    const bikeBookEndDateSelector = `${ bikeBookingDatepickerFormSelector } #end-date`;

    $("#bike-booking-datepicker-form .date").dateAndTime();
    let addedFormEventListener = false;

    $bookingsContentSection.on("click", bookBikeButtonSelector, function (event) {
        const $self = $(this);
        let $bikeBookingModal = $(bikeBookingDatepickerModalSelector);
        
        let bikeBookingFormInterval = setInterval(function () {
            if ($bikeBookingModal.length > 0) {
                clearInterval(bikeBookingFormInterval);

                const hubName = $(`.bookings-content [attr-hub-id='${ $self.attr("attr-bike-hub-ID") }']`).html();
                
                $(bikeBookHubFormFieldSelector).val(hubName);
                $(bikeBookNameFormFieldSelector).val($self.attr("attr-bike-Name"));

                const userID = 1;
                const bikeID = Number($self.attr("attr-bike-ID"));

                if (!addedFormEventListener) {
                    _addSubmitFormEventListener(1, bikeID);
                }
            }
            else {
                $bikeBookingModal = $(bikeBookingDatepickerModalSelector);
            }
            
        }, 100);
    });

    const _addSubmitFormEventListener = (userID, bikeID) => {
        addedFormEventListener = true;

        $(bikeBookingDatepickerFormSelector).on("submit", async function (event) {
            event.preventDefault();

            const startDate = new Date($(bikeBookStartDateSelector).val()).toString();
            const endDate = new Date($(bikeBookEndDateSelector).val()).toString();

            try {
                let response = await fetch(`/bookings/${ userID }/${ bikeID }`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ startDate: startDate, endDate: endDate })
                });
        
                let data = await response.json();
                console.log(data);
            } 
            catch (error) {
                console.log(error);
            }
        })
    };
});