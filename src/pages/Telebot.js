import { useContext, useState } from "react"
import { UserContext } from '../utils/UserContext'
import NavigationBar from "../components/NavigationBar"
import axios from 'axios'

const Telebot = () => {

    const [state, setState] = useState({
        username: '',
        category: '',
    })
    const {user, setUser} = useContext(UserContext)

    const url = 'http://localhost:5000/api/v1/telebots'

    const change = (e) => {    
        const newState = {...state}
        newState[e.target.name] = e.target.value
        setState(newState)
    }

    const onUsernameSubmit = (e) => {
        e.preventDefault();

        axios.post(url, {
            username: state.username
        }, 
            {
                 headers: {
            'Authorization': `Bearer ${user.token}`}
            }
            ).then(
            res => {
                alert('Telegram Username Registered!')
            }
        ).catch(
            err => alert(err)
        )
    }

    const onCategorySubmit = (e) => {
        e.preventDefault();

        axios.put(url, {
            category: state.category
        }, 
            {
                 headers: {
            'Authorization': `Bearer ${user.token}`}
            }
            ).then(
            res => {
                alert(res.data)
            }
        ).catch(
            err => alert(err)
        )
    }

    return (
        <>
            <NavigationBar loggedin={true} func={() => 
                {
                    localStorage.removeItem('prosfero-token')
                    localStorage.removeItem('prosfero-id')
                    setUser(
                        {
                            token : null,
                            id : null
                        })
                }
            }/>

            <div className ='form-pad'>
                <form className='form-post'>
                    <div className="text-center">
                        <h1 style={{fontFamily: 'Dancing Script'}}>Set up your telebot!</h1>
                    </div>    
                    <div className="text-left">
                        <h8>You can set up your Telegram bot extension and recieve notifications whenever a new item is posted!</h8>
                    </div> 
                    <div className="mb-3">
                        <h8>Enter the Telegram username you want to connect your Prosfero account with.</h8>
                        <br/><br/><label htmlFor="title" className="form-label">Telegram Username</label>
                        <input type="text" className="form-control" id="username" name='username' onChange={e => change(e)} value={state.username} placeholder="Enter Telegram username" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" onClick={e => onUsernameSubmit(e)}>Submit</button>
                    </div>
                </form>
            </div>
            <br/>
            <div className ='form-pad'>
                <form className='form-post'>
                    <div className="mb-3">
                        <h8>Add a category to your <i>Interested</i> 
                            <br/>You will then recieve a notification whenever an item is posted in that category!</h8>
                        <br/><br/><select className="form-select" name="category" value={state.category} onChange={e => change(e)} aria-label="choose chatergory">
                            <option value='' defaultValue disabled>Choose category</option>
                            <option value="Food">Food</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Stationary">Stationary</option>
                            <option value="Furniture">Furniture</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" onClick={e => onCategorySubmit(e)}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Telebot