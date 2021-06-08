
const NavigationBar = ({loggedin, func: logout }) => {

    const fontStyle = {
        fontFamily: 'Dancing Script',
    };

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" style={fontStyle} >Prosfero</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    {loggedin ? 
                    <>
                    <li class="nav-item">
                    <a class="nav-link" href="/profile">Profile</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href='/login' onClick={() => logout()}>Logout</a>
                    </li> 
                    </> : 
                    <>
                    <li class="nav-item">
                    <a class="nav-link" href="/registration">Register</a>
                    </li> 
                    <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
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
