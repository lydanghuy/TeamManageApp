import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Header extends  Component{
    render(){
        return(
            <div className="form-inline">
                <button className="btn  mx-auto"><Link className="link" to='/'>Project List</Link></button>      
                <button className="btn  mx-auto"><Link className="link" to='/createmember'>Create New Member</Link></button>      
                <button className="btn mx-auto"><Link className="link" to='/createproject'>Create New Project</Link></button>      
            </div>
        )
    }
}