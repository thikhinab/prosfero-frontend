import { useContext } from "react"
import { UserContext } from '../utils/UserContext'
import NavigationBar from "../components/NavigationBar"
import '../style/CreatePost.css'

const CreatePost = () => {

    const {user, setUser} = useContext(UserContext)
    

    return (
        <>
            <NavigationBar loggedin={true} func={() => 
                {
                    localStorage.removeItem('prosfero-token')
                    setUser({token: null})
                }
            }/>
            <div className ='form-pad'>
                <form className='form-post'>
                    <div className="text-center">
                        <h1 style={{fontFamily: 'Dancing Script'}}>Create Your Posts</h1>
                    </div>     
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="title" placeholder="Enter the title of your post" />
                    </div>
                    <div className="mb-3">
                        <select class="form-select" aria-label="choose chatergory">
                        <option value='' selected disabled>Choose catergory</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Descripton of Item</label>
                        <textarea class="form-control" id="description" rows="3"></textarea>
                    </div>
                    <div className="input-group mb-3">
                        <input type="file" className="form-control" id="image" />
                        <label className="input-group-text" for="image" >Upload</label>
                    </div>
                    <div className="text-center">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePost
