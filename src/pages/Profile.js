import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import { UserContext } from '../utils/UserContext'
// Demo
import pic from '../demo/profile.jpg'

const Profile = () => {

    const {user, setUser} = useContext(UserContext)

    const [profile, setProfile] = useState({})

    const url = 'http://localhost:5000/api/v1/profile'

    const formatDate = (d) => {
        const date = new Date(d)
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
  
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return dd + '/' + mm + '/' + yyyy;
    }


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
                    setProfile(res.data)
                }
            ).catch(
                err => alert(err)
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
                                    <p>{`${profile.firstName} ${profile.lastName}`}</p>
                                </div>
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Email</h6>
                                    <p>{profile.email}</p>
                                </div>
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Date Joined</h6>
                                    <p>{formatDate(profile.createdAt)}</p>
                                </div>
                            </div>                          
                        </div>
                        <div className="col text-center" style={{margin: '1rem'}}>
                            <img className='profile-picture' src={pic} alt='profile pif'/>
                            <h2 style={{fontFamily:'Dancing Script', marginTop: '1rem'}}>{profile.username}</h2>
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
                                    <p>{profile.achievementLevel}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile
