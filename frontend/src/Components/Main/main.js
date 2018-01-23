import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import List from '../List/list';
import CreateMember from '../CreateMember/createmember';
import CreateProject from '../CreateProject/createproject';
import ProjectDetail from '../ProjectDetail/projectDetail';
export default class Main extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={List}/>
                    <Route path='/createmember' component={CreateMember}/>
                    <Route path='/createproject' component={CreateProject}/>
                    <Route path='/projects/:id' component={ProjectDetail}/>
                </Switch>
            </div>
        )
    }
}