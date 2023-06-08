import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class HaircutAPI {

  async getHaircuts(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/haircut`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting haircuts')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
}

export default new HaircutAPI()