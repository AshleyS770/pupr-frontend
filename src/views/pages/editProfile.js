import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'
import moment from 'moment'

class EditProfileView {
  init(){
    console.log('EditProfileView.init')
    document.title = 'Edit Profile'    
    this.user = null
    this.render()    
    Utils.pageIntroAnim()
    this.getUser()    
  }

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async updateProfileSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try {
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      this.render()
      Toast.show('profile updated')
    }catch(err){      
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }


  render(){
    const template = html`
    <style>
    sl-input,
    sl-select,
    sl-checkbox {
      display: block;
      margin-bottom: var(--sl-spacing-medium);
    }

    sl-radio-group {
      text-align: left;
    }
    </style>
      <va-app-header title="Edit Profile" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      <div class="page-content">        
        ${(this.user == null) ? html`
          <sl-spinner pill></sl-spinner>
        `:html`
        <div class="profile-body" style="max-width:100%">
<h1 class="edit-profile-heading">Edit ${this.user.petName}'s Profile   <sl-icon name="person-circle" style="font-size: 25px;color:white;"></sl-icon></h1>

<p style="color:#0365B0;">Last updated: ${moment(Auth.currentUser.updatedAt).format('MMMM')}</p>
          <sl-form class="page-form" @sl-submit=${this.updateProfileSubmitHandler.bind(this)}>
          <div class="generic-card"><h5 class="edit-list">First Name</h5><div class="input-group">
              <sl-input type="text" name="firstName" value="${this.user.firstName}" placeholder="First Name" pill clearable><sl-icon name="pencil-fill" slot="suffix"></sl-icon></sl-input>
            </div></div>
            <div class="generic-card"><h5 class="edit-list">Last Name</h5><div class="input-group">
              <sl-input type="text" name="lastName" value="${this.user.lastName}" placeholder="Last Name" pill clearable>  <sl-icon name="pencil-fill" slot="suffix"></sl-icon></sl-input>
            </div></div>
            <div class="generic-card"><h5 class="edit-list">Email</h5><div class="input-group">
              <sl-input type="text" name="email" value="${this.user.email}" placeholder="Email Address" pill clearable><sl-icon name="pencil-fill" slot="suffix"></sl-icon></sl-input>
            </div>  </div>         
            <div class="generic-card"><h5 class="edit-list">Bio</h5><div class="input-group">
            <sl-textarea type="text" name="bio" value="${this.user.bio}" placeholder="bio" pill></sl-textarea>
          </div>  </div> 
          <div class="generic-card"><h5 class="edit-list">Pet Name</h5><div class="input-group">
          <sl-input type="text" name="petName" value="${this.user.petName}" placeholder="petname" pill clearable><sl-icon name="pencil-fill" slot="suffix"></sl-icon></sl-input>
        </div>  </div> 
        <div class="generic-card"><h5 class="edit-list">Pet Age</h5><div class="input-group">
        <sl-input type="text" name="petAge" value="${this.user.petAge}" placeholder="petAge" pill clearable><sl-icon name="pencil-fill" slot="suffix"></sl-icon></sl-input>
      </div>   </div>
      <div class="generic-card"><h5 class="edit-list">Suburb</h5><div class="input-group">
      <sl-input type="text" name="suburb" value="${this.user.suburb}" placeholder="suburb" pill clearable><sl-icon name="pencil-fill" slot="suffix"></sl-icon></sl-input>
    </div>    </div>
  <div class="generic-card"><h5 class="edit-list">Account Type</h5><div class="input-group">
  <sl-radio-group label="Select an option" name="account" value="${this.user.accountType}">
  <sl-radio-button value="Host">Host</sl-radio-button>&nbsp;
  <sl-radio-button value="Guest">Guest</sl-radio-button>&nbsp;
  <sl-radio-button value="Flexible">Flexible</sl-radio-button>
</sl-radio-group>
</div></div>
<div class="generic-card">
            <div class="input-group">
            <h5 class="edit-list">Photo</h5><br>          
              ${(this.user.avatar) ? html`
                <sl-avatar shape="rounded" style="--size: 100px;" image="${App.apiBase}/images/${this.user.avatar}"></sl-avatar>
                <input type="file" name="avatar" />
              `: html`
                <input type="file" name="avatar" />
              `}
            </div></div>
            <p>&nbsp;</p>
            <sl-button type="primary" class="submit-btn" submit>Update Profile</sl-button>
          </sl-form>
        `}
      </div></div>
    `
    render(template, App.rootEl)
  }
}


export default new EditProfileView()