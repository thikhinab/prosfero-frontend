import { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { UserContext } from '../utils/UserContext'
import { useParams, useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import NavigationBar from '../components/NavigationBar'
import '../style/Post.css'


const Post = () => {

    const {user, setUser} = useContext(UserContext)

    const history = useHistory()

    const { postId } = useParams()

    const [state, setState] = useState({
        text : ''
    }) 

    const change = (e) => {    
        const newState = {...state}
        newState[e.target.name] = e.target.value
        setState(newState)
    }

    const formUrl = `http://localhost:5000/api/v1/posts/requests/${postId}`

    const onSubmit = (e) => {
        e.preventDefault();

        axios.post(formUrl, {
            text : state.text
        }, 
            {
                 headers: {
            'Authorization': `Bearer ${user.token}`}
            }
            ).then(
            res => {
                alert('Request submitted!')
            }
        ).catch(
           err => {
               err.response && alert(err.response.data) 
               console.log(err)
            }
        )
    }

    const [showForm, setShowForm] = useState(false)

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
                                { state.userid === user.id ? <Link class="btn btn-primary" to={`/editpost/${postId}`}>Edit</Link> : 
                                <div
                                class="btn btn-primary"
                                onClick={() => setShowForm(!showForm)}
                                >Request</div> }
                                {showForm && 
                                <>
                                    <div className="mb-3">
                                    <label htmlFor="text" className="form-label">Text</label>
                                    <input type="text" className="form-control" id="text" name='text' onChange={e => change(e)} value={state.text} placeholder="(Optional) Enter request text" />
                                    <div className="text-center">
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-primary" onClick={e => onSubmit(e)}>Submit</button>
                                    </div>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>    
        )
}

export default Post
