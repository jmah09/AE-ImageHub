import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './componentsTemplate/Layout';
//import { Signin } from './componentsTemplate/Signin';
import { Home } from './componentsTemplate/Home';
import { Search } from './componentsTemplate/Search';
import { Palette } from './componentsTemplate/Palette';
import { Log } from './componentsTemplate/Log';
import { Trash } from './componentsTemplate/Trash';
import { Project } from './componentsTemplate/Project';
import { Metadata } from './componentsTemplate/Metadata';
import { User } from './componentsTemplate/User';
import { Upload } from './componentsTemplate/Upload';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/search' component={Search} />
                <Route path='/palette' component={Palette} />
                <Route path='/upload' component={Upload} />
                <Route path='/log' component={Log} />
                <Route path='/trash' component={Trash} />
                <Route path='/project' component={Project} />
                <Route path='/metadata' component={Metadata} />
                <Route path='/user' component={User} />
            </Layout>
        );
    }
}
