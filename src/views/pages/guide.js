import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'

class TemplateView {
  init(){
    document.title = 'Template'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

 async updateCurrentUser(){
try{
  const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {newUser : false}, 'json')
  console.log('user updated')
  console.log(updatedUser)
  }catch{
    Toast.show(err,'error')
  }
}

  render(){
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content" style="background-color:white;">        

      <h3 class="brand-color">Welcome ${Auth.currentUser.firstName}!</h3>
      <p>Let's get your profile set up so you can start socialising your pet. </p>
      <div class="guide-step">
        <h4>Step 1 - Create your profile</h4>
        <p>Here you will need to choose your account type, you can choose to be a host, guest or flexible user.</p>
    
      </div>
      
      <div class="guide-step">
        <h4>Step 2 - Search for friends</h4>
        <p>In the home tab you will find a whole list of new play mates for your furry friend.</p>
      </div>
      
      <div class="guide-step">
        <h4>Step 3 - Get social!</h4>
        <p>Reach out and organise a play date.</p>
      </div>
      
      <sl-button type="primary" @click=${() => gotoRoute('/editProfile')}>Okay got it!</sl-button>
      
      
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new TemplateView()