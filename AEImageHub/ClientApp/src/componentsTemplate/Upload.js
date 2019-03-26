import React, { Component } from 'react';
import { Title } from './Title';
import ImageUploader from './custom-image-upload';

export class Upload extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            pictures: []
        };
    }

    onDrop = (picture) =>
    {
        this.setState({
            pictures: this.state.pictures.concat(picture)
        });
    }

    render()
    {
        return (
            <div>
                <Title title='UPLOAD' />
                {this.renderContent()}
            </div>
        );
    }

    renderContent()
    {
        return (
            <ImageUploader
                withIcon = {true}
                withPreview = {true}
                buttonText = 'Choose images'
                onChange = {this.onDrop}
                imgExtension = {['.jpg', '.gif', '.png', '.gif', '.PNG']}
                maxFileSize = {5242880}
            />
        )
    }

}
