import { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { UserContext } from '../utils/UserContext'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import NavigationBar from '../components/NavigationBar'
import '../style/Post.css'
import img from '../demo/1.jpg'


const Post = () => {

    const {user, setUser} = useContext(UserContext)

    const history = useHistory()

    const [state, setState] = useState('') 

    const { postId } = useParams()

    const url = `http://localhost:5000/api/v1/posts/${postId}`

    useEffect(() => {
        axios.get(url,
            {
               headers: {
                   'Authorization': `Bearer ${user.token}` 
               } 
            }
            ).then(
                res => {
                    setState(res.data)
                }
            ).catch(
                err => {alert(err)
                history.push('/home')}
            )
    }, [])


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

            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col content">
                            <div className="text-center">
                            <img src={state.image} style={{maxWidth: '20rem', maxHeight:'20rem'}} className="img-thumbnail" alt="post image"/>
                            </div>
                        </div>
                        <div className="col info-box">
                            <h1>{state.title}</h1>
                            <p>{state.desc}</p>
                            <p>Category: {state.category}</p>
                            <p>Created at: {new Date(state.createdAt).toUTCString()}</p>
                            <div className="text-center">
                                { state.userid === user.id ? <button type="button" class="btn btn-primary">Edit</button> : <button type="button" class="btn btn-success">Request</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>    
        )
}

export default Post
