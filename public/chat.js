"use strict";

// const BASE_URL = "https://chat-room-be.herokuapp.com";
const BASE_URL = "http://localhost:3000";


$(window).on('load', function () {
    // Set up Enter room button
    $("#submit").click(() => {
        let username = $('#username').val();
        let url = $('#server').val();
        // console.log(username + " " + url);

        enterChatRoom();

        const evtSource = new EventSource(BASE_URL, { withCredentials: true } );
        evtSource.onmessage = function(event) {
            let message = event.data;
            console.log(message);
        }

        evtSource.onerror = function(err) {
            console.error("EventSource failed:", err);
        };
    });

    $('#send').click(() => {
        sendMessage();
    });
});

function sendMessage() {
    let form = new FormData();
    form.append("user", username);
    form.append("message", message);

    fetch(BASE_URL + '/postMessage', { method : "POST", body : form })
        .then(checkStatus)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
        })
        .catch(errHandler);
}

function enterChatRoom() {
    $('#join-room').addClass('hidden');
    $('#chat-room').removeClass('hidden');
}

/**
 * Check response status from backend
 * @param {object} response 
 * @returns {object} response if ok
 */
function checkStatus(response) {
    if (response.ok) {
        return response;
    } else {
        throw Error("Error in request: " + response.statusText);
    }
}

/**
 * Print out err message
 * @param {Error} err 
 */
function errHandler(err) {
    console.log(err);
}
