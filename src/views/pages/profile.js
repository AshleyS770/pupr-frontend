import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
    <style>

    @media only screen and (max-width: 600px) {
      sl-avatar {
        --size: 350px !important;
      }
.calign {
  text-align: left !important;
}

.profile-body {
  text-align: left !important;
}

.profile-bio {
  width: 350px !important;
}
    }

    </style>
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign profile-background">    
      <div class="profile-body">    
        ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar shape="rounded" style="--size: 800px; max-width:100%;margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar shape="rounded" style="--size: 600px; margin-bottom: 1em;"></sl-avatar>
        `}
        <div class="profile-content">
       <!-- <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
        <p>${Auth.currentUser.email}</p>-->
        <h3 class="profile-name">${Auth.currentUser.petName}, ${Auth.currentUser.petAge}</h3>  
        <p>${Auth.currentUser.suburb}</p>
        <p class="profile-bio">${Auth.currentUser.bio}</p> 
        </div>
        
        <p>Last updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>

        <!--<sl-button @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-button>-->
      </div>      
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()