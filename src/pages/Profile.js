import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import { UserContext } from '../utils/UserContext'

const Profile = () => {

    const {user, setUser} = useContext(UserContext)

    const [profile, setProfile] = useState(null)

    const url = 'http://localhost:5000/api/v1/users/profile'


    useEffect(() => {
        console.log(user.token)
        if (user !== null)
        axios.get(url,
            {
               headers: {
                   'Authorization': `Bearer ${user.token}` 
               } 
            }
            ).then(
                res => {
                    console.log(res.data)
                }
            ).catch(
                err => console.log(err)
            )
    }, [])


    
    if (!user || user.expired) {
        return <Redirect to='/login' />
    }

    return (
        <div>
            <NavigationBar loggedin={user} func={() => {
                localStorage.removeItem('prosfero-token')
                setUser(null)}}/>
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
