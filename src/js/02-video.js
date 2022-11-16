import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

let currentTimeData = localStorage.getItem('videoplayer-current-time');

if (currentTimeData) {
  try {
    let currentTime = JSON.parse(currentTimeData);
    player.setCurrentTime(currentTime);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(data.seconds)
    );
  }, 1000)
);
