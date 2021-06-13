import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import { UserContext } from '../utils/UserContext'
// Demo
import pic from '../demo/profile.jpg'

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
        <>
            
            <NavigationBar loggedin={user} func={() => 
                {
                    localStorage.removeItem('prosfero-token')
                    setUser(null)
                }
            }/>
            <div className='profile-background'>
                <div className="container profile">
                    <div className="row">
                        <div className="col">
                            <div className="text-center" style={{fontFamily: 'Dancing Script'}}>
                                <h2>About you</h2>
                            </div>
                            <div className="profile-box text-center">
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Name</h6>
                                    <p>David Spade</p>
                                </div>
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Email</h6>
                                    <p>example@example.com</p>
                                </div>
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Date Jonined</h6>
                                    <p>25th July 2021</p>
                                </div>
                            </div>                          
                        </div>
                        <div className="col text-center" style={{margin: '1rem'}}>
                            <img className='profile-picture' src={pic} alt='profile pif'/>
                            <h2 style={{fontFamily:'Dancing Script', marginTop: '1rem'}}>David23</h2>
                        </div>
                        <div className="col">
                            <div className="text-center" style={{fontFamily: 'Dancing Script'}}>
                                <h2>Stats</h2>
                            </div>
                            <div className="profile-box text-center">
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Posts</h6>
                                    <p>10</p>
                                </div>
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Requests</h6>
                                    <p>2</p>
                                </div>
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Achievement Level</h6>
                                    <p>Newbie</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

                
{/*             <div className='profile-box'>
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
            </div> */}
        </>
    )
}

export default Profile
