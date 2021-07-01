import axios from 'axios'
import React, {useContext, useEffect, useRef, useState} from 'react'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import { UserContext } from '../utils/UserContext'
import Person from '@material-ui/icons/Person'


const Profile = () => {

    const fileInput = useRef()

    const {user, setUser} = useContext(UserContext)

    const [image, setImage] = useState('')
    const [file, setFile] = useState('')

    const [profile, setProfile] = useState({})
    const [requests, setRequests] = useState([])

    const url = 'http://localhost:5000/api/v1/profile'
    const reqsurl = 'http://localhost:5000/api/v1/requests'


    const fileSelectedHandler = e => {
        setFile({
            selectedFile: e.target.files[0]
        })
    }

    const uploadImage = async () => {

        if (file.selectedFile !== undefined) {
            const files = file.selectedFile
            const data = new FormData()
            data.append('file', files)
            data.append('upload_preset', 'prosfero')

            axios.post("https://api.cloudinary.com/v1_1/drv2gra8s/image/upload",
            data).then(res => {
                const file = res.data
                setImage(file.secure_url)
                const data = { profilePicture: file.secure_url}

                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': "application/json"
                        }, body: JSON.stringify(data)
                    }).then(res => console.log('Profile updated'))
                    .catch(err => console.log(err))
            }).catch(
                err => console.log(err)
            )
        } else {
            alert('Please select an Image')
        }


      }
    

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
        if (user.token !== null)
        axios.get(url,
            {
               headers: {
                   'Authorization': `Bearer ${user.token}` 
               } 
            }
            ).then(
                res => {
                    setProfile(res.data)
                    setImage(res.data.profilePicture)
                }
            ).catch(
                err => alert(err)
            )
            document.body.style = 'background: #b3e0ff;';

            axios.get(reqsurl,
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}` 
                    } 
                 }).then( res => {
                setRequests(res.data)
            }).catch(
                err => alert(err)
            )
    }, [])

    const createReqData = (reqData) => {
        return (
            // <div class="container px-4">
            //     <div class="row gx-5">
                    <div class="col">
                        <div class="p-3 border bg-light"> <b>{reqData[0]}</b> <br/>By <i>{reqData[1]}</i> <br/> {reqData[2]} </div>
                    </div>
                    //  <div class="col">
                    //      <div class="p-3 border bg-light">{reqData[1]}</div>
                    // </div>
                    // <div class="col">
                    //      <div class="p-3 border bg-light">{reqData[2]}</div>
                    // </div>
            //     </div>
            // </div>
        )}


    
    if (!user.token || user.expired) {
        return <Redirect to='/login' />
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
                            { image ?
                                <img className='profile-picture' src={image} alt='profile pif'/>
                                : 
                                    <div style={{margin: '3rem'}}>
                                        <Person style={{transform: 'scale(5)'}}/>
                                    </div>
                                    
                                }
                            <input style={{display: 'none'}}  type='file' name='file' placeholder='Upload Profile Picture'
                             onChange={fileSelectedHandler}
                             ref={fileInput} />
                             <div className="d-grid gap-2 d-md-block" style={{margin: '1rem'}}>
                                <button type="button" className="btn btn-outline-primary btn-sm" style={{margin: '0.25rem'}} onClick={() => fileInput.current.click()} >Choose Profile Picture</button>
                                <button type="button" className="btn btn-outline-primary btn-sm" style={{margin: '0.25rem'}} onClick={uploadImage}>Upload</button>
                             </div>
                            <h2 style={{fontFamily:'Dancing Script', marginTop: '1rem'}}>{profile.username}</h2>
                        </div>
                        <div className="col">
                            <div className="text-center" style={{fontFamily: 'Dancing Script'}}>
                                <h2>Stats</h2>
                            </div>
                            <div className="profile-box text-center">
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Posts</h6>
                                    <p>{profile.noOfPosts}</p>
                                </div>
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Requests</h6>
                                    <p>{requests.length}</p>
                                </div>
                                <div>
                                    <h6 style={{fontWeight: 'bold'}}>Achievement Level</h6>
                                    <p>{profile.achievementLevel}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{color: '#b3e0ff'}}>
                    ...
                </div>
                <div className="container profile">
                    <div className="text-center" style={{fontFamily: 'Dancing Script'}}>
                            <h2>Your Post Requests</h2>
                    </div>
                    {/* <div class="container px-4">
                        <div class="row gx-5">
                            <div class="col">
                                <div class="p-3 border bg-light">Requested Item</div>
                            </div>
                            <div class="col">
                                <div class="p-3 border bg-light">Requested By</div>
                            </div>
                            <div class="col">
                                <div class="p-3 border bg-light">Request Details</div>
                            </div>
                        </div>
                    </div> */}

                    { requests.length > 0 ?
                                    <div class="container px-4">
                                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 gx-5">
                                                {requests.map(item => createReqData(item)) }
                                        </div>
                                    </div>
                                    : <div className='text-center'>No requests yet</div>
                    }

                </div>
            </div>
        </>
    )
}

export default Profile
