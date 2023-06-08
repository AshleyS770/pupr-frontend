import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import Toast from '../Toast'
import UserAPI from '../UserAPI'

customElements.define('va-haircut', class Haircut extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      price: {
        type: String
      },
      user: {
        type: Object
      },
      image: {
        type: String
      },
      gender: {
        type: String
      },
      length: {
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
      Toast.show('Haircut added to favourites')
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
<div class="wrap">
<div class="image">
<img src="${App.apiBase}/images/${this.image}" alt="${this.name}"
</div>
<div class="content">
<h2>${this.name}</h2>
<h3>${this.description}</h3>
<p class="price">${this.price}</p>
<p class="gender">${this.gender}</p>
<p class="length">${this.length}</p>

<sl-icon-button name="heart-fill" label="Add to Favourites" @click=${this.addFavHandler.bind(this)}>Add to Favourites</sl-icon-button>
</div>
</div>
    `
  }
  
})
