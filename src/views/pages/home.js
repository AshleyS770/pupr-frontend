import App from '../../App'
import { html, render } from 'lit-html'
import { gotoRoute, anchorRoute } from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import ProfileAPI from '../../ProfileAPI'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'



class socialView {
  init() {
    document.title = 'Social'
    this.profiles = null
    this.render()
    Utils.pageIntroAnim()
    this.getProfiles()

    'use strict';

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');

function initCards(card, index) {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });
  
  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    initCards();

    event.preventDefault();
  };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);

  }

  async getProfiles(){
    try {
      this.profiles = await ProfileAPI.getProfiles()
      console.log(this.profiles)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }


  async addFavHandler(){    
    try {
      UserAPI.addFavHaircut(this.id)
      Toast.show('added to friends!')
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render() {
    const template = html`
      <va-app-header title="Social" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1 style="float:left; color:white; margin-left:25px;">Find a friend!</h1>
        <div class="switch-button">
        <input class="switch-button-checkbox" type="checkbox"></input>
        <label class="switch-button-label" for=""><span class="switch-button-label-span"><h4 style="color:white; margin:0;">Visitor</h4></span></label>
      </div>
        <div class="tinder">
        <div class="nocards">Oh no! There's no cards left :( </div>
      ${this.profiles == null ? html `
        <sl-spinner></sl-spinner>
        `
         : html 
         `   
         <div class="tinder--cards">
          ${this.profiles.map(profile => html `
    <div class="tinder--card">
   <img slot="image"
    src="${App.apiBase}/images/${profile.avatar}"
    alt="${profile.avatar}"
  />
  <p style="font-size:25px; color: #0365B0"><b>${profile.petName}, ${profile.petAge}</b></p>
  <p class="card-location">${profile.suburb}</p>
  <p> By ${profile.user.firstName} ${profile.user.lastName}</p>
    </div>
          `)}
         </div> `}
         <div class="tinder--buttons">
           <img class="profile-icon" id="nope" class="tinder-nope" src="/images/dislike.png">
       <img class="profile-icon" id="love" class="tinder-love" @click=${this.addFavHandler.bind(this)} src="/images/like.png">
       </div> </div>      
    `
    render(template, App.rootEl)
  }
}


export default new socialView()