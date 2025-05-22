class Drumkit {
    constructor() {
        // Selecting DOM elements
      this.pads = document.querySelectorAll('.pad');
      this.playBtn = document.querySelector('.play');
      this.currentKick = './sounds/kick-classic.wav';
      this.currentSnare = './sounds/snare-acoustic01.wav';
      this.currentHihat = './sounds/hihat-acoustic01.wav';
      this.currentclap = './sounds/clap-808.wav';
      this.kickAudio = document.querySelector('.kick-sound');
      this.snareAudio = document.querySelector('.snare-sound');
      this.hihatAudio = document.querySelector('.hihat-sound');
      this.clapAudio = document.querySelector('.clap-sound');
      this.index = 0;
      this.bpm = 150; // beat per minute
      this.isPlaying = null;
      this.selects = document.querySelectorAll('select');
      this.muteBtns = document.querySelectorAll('.mute');
      this.tempoSlider = document.querySelector('.tempo-slider');
    }
  
    activePad() {
      this.classList.toggle('active');
    }
  
    repeat() {
      let step = this.index % 8;
      const activeBars = document.querySelectorAll(`.b${step}`);
      // Loop over the bars
      activeBars.forEach(bar => {
        bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
        // Check if bars are active
        if (bar.classList.contains('active')) {
          // Check each sound
          if (bar.classList.contains('kick-pad')) {
            this.kickAudio.currentTime = 0;
            this.kickAudio.play();
          }
          if (bar.classList.contains('snare-pad')) {
            this.snareAudio.currentTime = 0;
            this.snareAudio.play();
          }  if (bar.classList.contains('hihat-pad')) {
            this.hihatAudio.currentTime = 0;
            this.hihatAudio.play();
          }
          else if (bar.classList.contains('clap-pad')) {
            this.clapAudio.currentTime = 0;
            this.clapAudio.play();
          }
        }
      });
      this.index++;
    }
  
    start() {
      const interval = (30 / this.bpm) * 1000;
      // Check if it's playing
      if (!this.isPlaying) {
        this.isPlaying = setInterval(() => {
          this.repeat();
        }, interval);
      } else {
        // Clear interval
        clearInterval(this.isPlaying);
        this.isPlaying = null;
      }
    }
  
    updateBtn() {
      if (!this.isPlaying) {
        this.playBtn.innerText = 'Stop';
        this.playBtn.classList.add('active');
      } else {
        this.playBtn.innerText = 'Play';
        this.playBtn.classList.remove('active');
      }
    }
  
    changeSound(e) {
      const selectionName = e.target.name;
      const selectionValue = e.target.value;
  
      switch (selectionName) {
        case 'kick-select':
          this.kickAudio.src = selectionValue;
          break;
        case 'snare-select':
          this.snareAudio.src = selectionValue;
          break;
        case 'hihat-select':
          this.hihatAudio.src = selectionValue;
          break;
          case 'clap-select':
            this.clapAudio.src = selectionValue;
            break;
      }
    }
  
    mute(e) {
      const muteIndex = e.target.getAttribute('data-track');
      e.target.classList.toggle('active');
      if (e.target.classList.contains('active')) {
        switch (muteIndex) {
          case '0':
            this.kickAudio.volume = 0;
            break;
          case '1':
            this.snareAudio.volume = 0;
            break;
          case '2':
            this.hihatAudio.volume = 0;
            break;
            case '3':
            this.clapAudio.volume = 0;
            break;
        }
      } else {
        switch (muteIndex) {
          case '0':
            this.kickAudio.volume = 1;
            break;
          case '1':
            this.snareAudio.volume = 1;
            break;
          case '2':
            this.hihatAudio.volume = 1;
            break;
            case '3':
            this.clapAudio.volume = 1;
            break;
        }
      }
    }
  
    changeTempo(e) {
      const tempoText = document.querySelector('.tempo-num');
      tempoText.innerText = e.target.value;
    }
  
    updateTempo(e) {
      this.bpm = e.target.value;
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      const playBtn = document.querySelector('.play');
      if (playBtn.classList.contains('active')) {
        this.start();
      }
    }
  }
  
  const drumkit = new Drumkit();
  
  // activating the pads
  drumkit.pads.forEach(pad => {
    pad.addEventListener('click', drumkit.activePad);
    pad.addEventListener('animationend', function () {
      this.style.animation = '';
    });
  });
  
  // click play button
  drumkit.playBtn.addEventListener('click', () => {
    drumkit.updateBtn();
    drumkit.start();
  });
  
  // sound options
  drumkit.selects.forEach(select => {
    select.addEventListener('change', function (e) {
      drumkit.changeSound(e);
    });
  });
  
  // Mute buttons
  drumkit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      drumkit.mute(e);
    });
  });
  
  // Tempo
  drumkit.tempoSlider.addEventListener('input', function (e) {
    drumkit.changeTempo(e);
  });
  
  drumkit.tempoSlider.addEventListener('change', function (e) {
    drumkit.updateTempo(e);
  });


  // Function to toggle full screen mode
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}
document.getElementById("fullscreen-button").addEventListener("click", function() {
  toggleFullScreen();
});

const keys = document.querySelectorAll('.key');

document.addEventListener('keydown', event => {
  const key = document.getElementById('key-' + event.keyCode);

  if (key) {
    key.classList.add('active');
  }
});

document.addEventListener('keyup', event => {
  const key = document.getElementById('key-' + event.keyCode);

  if (key) {
    key.classList.remove('active');
  
        }
});
