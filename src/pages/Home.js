import { useContext, useState, useEffect } from "react"
import { UserContext } from '../utils/UserContext'
import NavigationBar from "../components/NavigationBar"
import '../style/CreatePost.css'
import axios from 'axios'
import { Redirect } from "react-router"
import { Link} from "react-router-dom"
import '../style/Home.css'



const Home = () => {

  const {user, setUser} = useContext(UserContext)
  const [reachedEnd, setReachedEnd] = useState(false)
  const [state, setState] = useState([])
  const [page, setPage] = useState(1)
  const [data, setData] = useState({
    skip: 0,
    limit: 8
  })

  const baseUrl = "http://localhost:5000/api/v1/posts"

  const scrollToEnd = () => {
    setData({
      skip: data.skip + data.limit,
      limit: data.limit
    })
    setPage(page + 1)
  }

  window.onscroll = () => {
    if (!reachedEnd) {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        scrollToEnd()
      }
    }
  }
  
  useEffect(() => {

    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })


    instance.get(`/limited/${data.limit}/${data.skip}`)
    .then(res => {
      if (res.data.length < 8) {
        setReachedEnd(true)
      }
      setState([...state, ...res.data])
    }
    
    
    )
    .catch(err => alert(err))
}, [page])


   const createPost = (post) => {
      return (
      <>
      
      <div key={post.id} className="col col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <div className="card h-100">
          <Link to={`/post/${post.id}`} >
        <img src={post.image} className="card-img-top crop" style={{ maxHeight: "15rem" }} alt="..." />
          </Link>
        <div className="card-body">
          <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <h5 className="card-title">{post.title}</h5>
          </Link>
          <p className="card-text">{post.desc}</p>
        </div>
        <div className="card-footer">
          <small>{post.username}</small>
          <br/>
          <small className="text-muted">{new Date(post.createdAt).toUTCString()}</small>
        </div>
      </div>
    </div>
    </>
    )


   }


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
      <div className="container" style={{marginTop: "1rem"}}>
          <div className="title text-center" style={{fontFamily: 'Dancing Script', fontWeight: 'bold'}}>
            <h1>The Latest Posts!</h1>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4" >

            {
              state.length > 0 && state.map(post => createPost(post))
            }

        </div>
      </div>
      </>
    )
}

export default Home
