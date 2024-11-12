// ==UserScript==
// @name         YouTube Unlimited Volume Booster
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Increases YouTube volume and is unlimited
// @author       Marse Lavedo
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function boostVolume() {
        const videoPlayer = document.querySelector('video');
        if (videoPlayer) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaElementSource(videoPlayer);
            const gainNode = audioContext.createGain();

            gainNode.gain.value = 4; // for semi bass set to 7 if you for SOME reason want it to be really loud put 999

            source.connect(gainNode);
            gainNode.connect(audioContext.destination);

            console.log('Volume boosted to 500%.');
        } else {
            console.log('Video player not found.');
        }
    }

    window.addEventListener('load', boostVolume);
    setInterval(boostVolume, 1000);
})();
