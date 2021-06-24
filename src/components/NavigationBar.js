import { useHistory } from 'react-router-dom'

const NavigationBar = ({loggedin, func: logout }) => {

    const history = useHistory()

    const fontStyle = {
        fontFamily: 'Dancing Script',
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand" style={fontStyle} >Prosfero</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {loggedin ? 
                    <>
                    <li className="nav-item">
                    <a className="nav-link" href="/profile">Profile</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/createpost">Create Post</a>
                    </li>
                    <li className="nav-item">
                    <span className="nav-link" onClick={() => { 
                    history.push("/createpost")
                    }} >New Post</span>
                    </li>
                    <li className="nav-item">
                    <span className="nav-link" onClick={() => { 
                    logout()
                    history.push('/login')
                    }} >Logout</span>
                    </li> 
                    </> : 
                    <>
                    <li className="nav-item">
                    <a className="nav-link" href="/registration">Register</a>
                    </li> 
                    <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                    </li> 
                    </>
                    }
                </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default NavigationBar
