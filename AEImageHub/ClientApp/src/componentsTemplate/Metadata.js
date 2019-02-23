import React, { Component } from 'react';
import { Title } from './Title';

export class Metadata extends Component {

    render() {
        return (
            <div>
                <Title title='MANAGEMENT : METADATA' />
                {this.renderFunction()}
                {this.renderContent()}
            </div>
        );
    }

    // TODO
    renderFunction() {
        return (
            <div class="fnbar">
                Function stub
            </div>
        )
    }

    // TODO
    renderContent() {
        return (
            <div>
                Metadata stub
            </div>
        )
    }

}
