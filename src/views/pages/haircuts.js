import App from '../../App'
import { html, render } from 'lit-html'
import { gotoRoute, anchorRoute } from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import HaircutAPI from '../../HaircutAPI'
import Toast from '../../Toast'



class TemplateView {
  init() {
    document.title = 'Haircuts'
    this.haircuts = null
    this.render()
    Utils.pageIntroAnim()
    this.getHaircuts()
  }

  async getHaircuts(){
    try {
      this.haircuts = await HaircutAPI.getHaircuts()
      console.log(this.haircuts)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render() {
    const template = html`
      <va-app-header title="Favourites" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Page title</h1>
        <p>Page content ...</p>
        <div class="haircuts-grid">${this.haircuts == null ? html `
        <sl-spinner></sl-spinner>
        `
         : html 
         `
          ${this.haircuts.map(haircut => html `
          <va-haircut class="haircut-card"
    src="${App.apiBase}/images/${haircut.image}"
    id="${haircut._id}"
  name="${haircut.name}"
  price="${haircut.price}"
  user="${JSON.stringify(haircut.user)}"
  image="${haircut.image}"
  >
</sl-card>
          `)}
         `}
        </div>
      
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new TemplateView()