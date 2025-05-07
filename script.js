let speechSynthesis = window.speechSynthesis;
let lastTap = 0;
let placesData = [];
let currentPlaceIndex = 0;

document.getElementById('touchArea').addEventListener('touchend', handleDoubleTap);

function handleDoubleTap(event) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
        getLocation();
        event.preventDefault();
    }
    lastTap = currentTime;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation bu tarayıcı tarafından desteklenmiyor.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    fetchNearbyPlaces(lat, lng);
}

function showError(error) {
    let errorMessage;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "Kullanıcı konum isteğini reddetti.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Konum bilgisi mevcut değil.";
            break;
        case error.TIMEOUT:
            errorMessage = "Konum isteği zaman aşımına uğradı.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "Bilinmeyen bir hata oluştu.";
            break;
    }
    alert(errorMessage);
    speakText(errorMessage);
}

function fetchNearbyPlaces(lat, lng) {
    // The radius (in meters) defines the search area around the user's location.
    // In this case, places within 120 meters will be retrieved.
    let url = `/nearbyPlaces?lat=${lat}&lng=${lng}&radius=120`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            placesData = data.results;
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            if (placesData.length === 0) {
                resultsDiv.innerHTML = '<p>Sonuç bulunamadı.</p>';
                speakText("Yakında yer bulunamadı.");
            } else {
                placesData.forEach(place => {
                    resultsDiv.innerHTML += `<p>${place.name} - ${place.vicinity}</p>`;
                });
                currentPlaceIndex = 0;
                speakNextPlace();
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            speakText("Veri alınırken bir hata oluştu.");
        });
}

function speakNextPlace() {
    if (currentPlaceIndex < placesData.length) {
        const place = placesData[currentPlaceIndex];
        speakText(place.name);
        currentPlaceIndex++;
    } else {
        speakText("Tüm yerler okundu.");
    }
}

function speakText(text) {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.onend = function() {
        if (currentPlaceIndex < placesData.length) {
            setTimeout(speakNextPlace, 1000);
        }
    };
    speechSynthesis.speak(utterance);
}
