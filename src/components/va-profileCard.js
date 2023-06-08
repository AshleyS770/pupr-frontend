import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('va-profilecard', class profileCard extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      petName: {
        type: String
      },
      petAge: {
        type: Number
      },
      avatar: {
        type: String
      },
      suburb: {
        type: String
      },
      user: {
        type: Object
      }  
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler(){
alert("more info")
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
<sl-card>
<img slot="image" src="${this.image}"/>
<h2>${this.petName}</h2>
<h3>${this.petAge}</h3><h3>${this.suburb}</h3>
<p class="author">By ${this.user.firstName} ${this.user.lastName}</p>
<sl-button @click=${this.moreInfoHandler.bind(this)}>More info</sl-button>
<sl-icon-button name="heart-fill" label="Add to Favourites" @click=${this.addFavHandler}></sl-icon-button>
</sl-card>
    `
  }
  
})
