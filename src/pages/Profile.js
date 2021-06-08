import React, {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import { UserContext } from '../utils/UserContext'

const Profile = () => {

    const {user, setUser} = useContext(UserContext)

    if (!user) {
        return <Redirect to='/login' />
    }
    return (
        <div>
            <NavigationBar loggedin={user} func={() => setUser(null)}/>
            <div className='profile-box'>
                <h1 style={{fontFamily: 'Dancing Script', fontSize: '3rem'}}>{user.username}</h1>
                <p style={{fontFamily: 'Dancing Script', fontSize: '1.5rem'}}>Your profile</p>
                <br />
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span style={{fontWeight: 'bold'}} >First Name:</span> {user.firstName}</li>
                    <li className="list-group-item"><span style={{fontWeight: 'bold'}} >Last Name:</span> {user.lastName}</li>
                    <li className="list-group-item"><span style={{fontWeight: 'bold'}} >Email:</span> {user.email}</li>
                    <li className="list-group-item"><span style={{fontWeight: 'bold'}} >Posts:</span> 0</li>
                    <li className="list-group-item"><span style={{fontWeight: 'bold'}} >Achievement Level:</span> NEWBIE</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile
