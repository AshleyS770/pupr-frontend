import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class favouriteHaircutsView {
  init(){
    document.title = 'Fave Haircuts'  
    this.friends = null  
    this.render()    
    Utils.pageIntroAnim()
    this.getFriends()
    this.listFriends()
  }


  async getFriends(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.petFriends = currentUser.friends
      console.log(this.petFriends)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }


  render(){
    const template = html`
      <va-app-header title="Friends" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Arrange a playdate</h1>
        <div class="haircuts-grid">
        ${this.petFriends == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.petFriends.map(friend => html`
            <va-tinderCard class="tinderCard"
              id="${friend._id}"
            >        
            </va-haircut>

          `)}
        `}
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new favouriteHaircutsView()