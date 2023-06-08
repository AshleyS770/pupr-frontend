import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import Toast from '../Toast'
import UserAPI from '../UserAPI'

customElements.define('va-tinderCard', class tinderCard extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      petName: {
        type: String
      },
      petAge: {
        type: String
      },
      suburb: {
        type: String
      }       
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler(){
const dialogEl = document.createElement('sl-dialog')
dialogEl.className = 'haircut-dialog'
const dialogContent = html `
<h1>Test</h1>
`
  }

  async addFavHandler(){    
    try {
      UserAPI.addFavHaircut(this.id)
      Toast.show('User has been added to Friends')
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  render(){    
    return html`
    <style>
    .author {
        font-size: .9em;
        font-style: italic;
        opacity: 0.8;
        
    }
    </style>
    <div class="tinder--card">
    <img slot="image"
     src="${App.apiBase}/images/${profile.avatar}"
     alt="${profile.avatar}"
   />
   <p style="font-size:25px; color: #0365B0"><b>${profile.petName}, ${profile.petAge}</b></p>
   <p class="card-location">${profile.suburb}</p>
   <p> By ${profile.user.firstName} ${profile.user.lastName}</p>
     </div>
<sl-icon-button name="heart-fill" label="Add to Favourites" @click=${this.addFavHandler.bind(this)}>Add to Favourites</sl-icon-button>
</div>
</div>
    `
  }
  
})
