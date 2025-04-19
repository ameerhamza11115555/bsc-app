let coins = 0;
let adsWatchedToday = 0;
const maxAdsPerDay = 5;
let lastAdTime = 0;
let depositAmount = 0;
let withdrawRequested = false;
let joinDate = new Date();

function watchAd() {
    const now = new Date();
    const lastWatched = localStorage.getItem("lastAdDate");
    const today = now.toDateString();

    if (lastWatched !== today) {
        adsWatchedToday = 0;
        localStorage.setItem("lastAdDate", today);
    }

    if (adsWatchedToday < maxAdsPerDay) {
        coins++;
        adsWatchedToday++;
        document.getElementById("coinCount").innerText = coins;
        document.getElementById("adsRemaining").innerText = maxAdsPerDay - adsWatchedToday;
        localStorage.setItem("coins", coins);
        localStorage.setItem("adsWatchedToday", adsWatchedToday);
    } else {
        document.getElementById("timerMsg").innerText = "Ads limit reached. Try again after 24 hours.";
    }
}

function buyProduct(price) {
    if (coins >= price) {
        coins -= price;
        depositAmount += price;
        document.getElementById("coinCount").innerText = coins;
        alert("Product purchased successfully!");
    } else {
        alert("Not enough coins.");
    }
}

function withdraw() {
    const now = new Date();
    const daysPassed = Math.floor((now - joinDate) / (1000 * 60 * 60 * 24));
    const maxWithdraw = Math.floor(depositAmount / 500) * 520;

    if (daysPassed < 7) {
        document.getElementById("withdrawMsg").innerText = "You can withdraw after 7 days.";
    } else if (coins < maxWithdraw) {
        document.getElementById("withdrawMsg").innerText = "You must earn full amount to withdraw.";
    } else {
        document.getElementById("withdrawMsg").innerText = "Withdraw request submitted for " + maxWithdraw + " PKR.";
        withdrawRequested = true;
    }
}

// Load saved coins
window.onload = function() {
    coins = parseInt(localStorage.getItem("coins")) || 0;
    adsWatchedToday = parseInt(localStorage.getItem("adsWatchedToday")) || 0;
    document.getElementById("coinCount").innerText = coins;
    document.getElementById("adsRemaining").innerText = maxAdsPerDay - adsWatchedToday;
}
