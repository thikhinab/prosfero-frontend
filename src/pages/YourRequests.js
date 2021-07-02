import axios from 'axios'
import React, {useContext, useEffect, useRef, useState} from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../utils/UserContext'
import NavigationBar from '../components/NavigationBar'

const YourRequests = () => {

    const [requests, setRequests] = useState([''])
    const {user, setUser} = useContext(UserContext)

    const url = 'http://localhost:5000/api/v1/requests'

    useEffect(() => {
        if (user.token !== null) {
            const instance = axios.create({
                baseURL: url,
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
          
              })

        instance.post('',
            {
               headers: {
                   'Authorization': `Bearer ${user.token}` 
               } 
            }
            ).then(
                res => {
                    setRequests(res.data)
                    console.log('requests: ', res)
                }
            ).catch(
                err => alert(err)
            )
        }
        }, [])

        if (!user.token || user.expired) {
            return <Redirect to='/login' />
        }

        const createReqData = (reqData) => {
            return (
                <div class="col">
                    <div class="p-3 border bg-light">You requested <b>{reqData[0]}</b> <br/><i> On {new Date(reqData[1]).toUTCString()}</i>
                    <br/>You said:<br/>{reqData[2]}</div>
                </div>
            )}

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

                <div className="container profile">
                    <div className="text-center" style={{fontFamily: 'Dancing Script'}}>
                            <h2>Requests You Made</h2>
                    </div>
                    <div class="container px-4">
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 gx-5">
                            { requests &&
                                requests.map(item => createReqData(item))
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    
}

export default YourRequests