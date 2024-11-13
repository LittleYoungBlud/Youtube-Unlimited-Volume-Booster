// ==UserScript==
// @name         YouTube Volume Booster with GUI Slider
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Adds a GUI slider to control YouTube's volume and boosts volume up to 100%
// @author       Marse Lavedo
// @match        *://www.youtube.com/*
// @updateURL    https://raw.githubusercontent.com/LittleYoungBlud/Youtube-Unlimited-Volume-Booster/refs/heads/main/YouTube%20Volume%20Booster.js
// @downloadURL  https://raw.githubusercontent.com/LittleYoungBlud/Youtube-Unlimited-Volume-Booster/refs/heads/main/YouTube%20Volume%20Booster.js
// ==/UserScript==

(function() {
    'use strict';

    function createVolumeSlider() {
        const sliderContainer = document.createElement('div');
        sliderContainer.style.position = 'fixed';
        sliderContainer.style.bottom = '10px';
        sliderContainer.style.right = '10px';
        sliderContainer.style.zIndex = '1000';
        sliderContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        sliderContainer.style.padding = '10px';
        sliderContainer.style.borderRadius = '5px';

        const sliderLabel = document.createElement('label');
        sliderLabel.innerText = 'Volume: ';
        sliderLabel.style.color = 'white';
        sliderLabel.style.marginRight = '10px';

        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = '0';
        // edit the value below to edit max volume of slider MAX is 100
        volumeSlider.max = '20';
        volumeSlider.step = '0.1';
        volumeSlider.value = '1';
        volumeSlider.style.width = '200px';

        sliderContainer.appendChild(sliderLabel);
        sliderContainer.appendChild(volumeSlider);
        document.body.appendChild(sliderContainer);

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let gainNode = null;

        volumeSlider.addEventListener('input', function() {
            const videoPlayer = document.querySelector('video');
            if (videoPlayer) {
                if (!gainNode) {
                    const source = audioContext.createMediaElementSource(videoPlayer);
                    gainNode = audioContext.createGain();
                    source.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                }
                gainNode.gain.value = volumeSlider.value;
                console.log(`Volume set to ${volumeSlider.value * 100}%.`);
            } else {
                console.log('Video player not found.');
            }
        });
    }

    window.addEventListener('load', createVolumeSlider);
})();
