import React, { Component } from 'react';
import { Title } from './Title';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export class Project extends Component {

    render() {
        return (
            <div>
                <Title title='MANAGEMENT : PROJECT' />
                {this.renderFunction()}
                {this.renderContent()}
            </div>
        );
    }

    // TODO
    renderFunction() {
        return (
            <div class="fnbar">
                <button>Create Project</button>
            </div>
        )
    }

    // TODO
    renderContent() {
        const buttonStyle = {
            color: 'white',
            backgroundColor: '#1B53AD',
            textAlign: 'center',
            margin: "0px 0px 0px 65px"
        }
        const data = [
            {
                name: 'Bridge Project',
                date: '2019/02/26'
            },
            {
                name: 'Hoover Dam Project',
                date: '2019/02/26'
            },
            {
                name: 'Enguri Dam Project',
                date: '2019/02/26'
            },
            {
                name: 'Site C (Cancelled)',
                date: '2019/02/26'
            },
            {
                name: 'Road Project',
                date: '2019/02/26'
            },
    ]

        
        const columns = [
            {
                Header: 'Name',
                accessor:'name'
            },
            {
                Header: 'Status',
                Cell: () => <span><input type="checkbox" name="null"></input></span>
            },
            {
                Header: 'Date Created',
                accessor: 'date'
            },
            {
                Header: 'Add Media',
                Cell: () => <button class="addMedia" style={buttonStyle}>+</button>
            }
        ]
        return (
            <ReactTable data={data} columns={columns} />
        )
    }

}
