const EditPost = () => {

        const {user, setUser} = useContext(UserContext)
        const history = useHistory()
        const url = 'http://localhost:5000/api/v1/posts'
        const [image, setImage] = useState({
            file: null
        })
    
        const [state, setState] = useState({
            title: '',
            category: '',
            description: '',
            image: ''
        })
    
        const fileSelectedHandler = e => {
            setImage({
                file: e.target.files[0]
            })
        }
    
    
        const uploadImage = async (e) => {
            e.preventDefault();
    
            if (image.file !== null || image.file !== undefined) {
                const files = image.file
                const data = new FormData()
                data.append('file', files)
                data.append('upload_preset', 'prosfero')
    
                axios.post(process.env.URL,
                data).then(res => {
                    const file = res.data
                    const newState = {...state}
                    newState["image"] = file.secure_url
                    setState(newState)
                }).catch(
                    err => {
                        console.log(err)
                        alert(err)
                    }
    
                )
            } else {
                alert('Please select an Image')
            }
          }
    
    
        const change = (e) => {    
            const newState = {...state}
            newState[e.target.name] = e.target.value
            setState(newState)
        }
    
        const onSubmit = (e) => {
            e.preventDefault();
    
            axios.post(url, {
                title: state.title,
                desc: state.description,
                category: state.category,
                image: state.image
            }, 
                {
                     headers: {
                'Authorization': `Bearer ${user.token}`}
                }
                ).then(
                res => {
                    alert('Post submitted!')
                    history.push(`/post/${res.data.id}`)
                }
            ).catch(
                err => alert(err)
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
                <div className ='form-pad'>
                    <form className='form-post'>
                        <div className="text-center">
                            <h1 style={{fontFamily: 'Dancing Script'}}>Create Your Post</h1>
                        </div>     
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name='title' onChange={e => change(e)} value={state.title} placeholder="Enter the title of your post" />
                        </div>
                        <div className="mb-3">
                            <select className="form-select" name="category" value={state.category} onChange={e => change(e)} aria-label="choose chatergory">
                                <option value='' defaultValue disabled>Choose category</option>
                                <option value="Food">Food</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Stationary">Stationary</option>
                                <option value="Furniture">Furniture</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripton of Item</label>
                            <textarea className="form-control" id="description" rows="3" name='description' onChange={e => change(e)} value={state.description}></textarea>
                        </div>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" name="image" onChange={e => fileSelectedHandler(e)} id="image" />
                            <button className="input-group-text" htmlFor="image" onClick={(e) => uploadImage(e)} >Upload</button>
                        </div>
                        {
                            state.image  && 
                            <div className='text-center'>
                                <img src={state.image} className="img-thumbnail" alt="..." />
                            </div>
                            
                        }
    
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" onClick={e => onSubmit(e)}>Submit</button>
                        </div>
                    </form>
                    
                </div>
            </>
        )
}

export default EditPost
