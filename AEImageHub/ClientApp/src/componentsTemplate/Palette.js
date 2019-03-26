﻿import React, { Component } from 'react';
import { Title } from './Title';
import '../index.css';
import Gallery from './custom-photo-gallery';
import SelectedImage from './SelectedImage';
import axios from 'axios'
import { getCredentials, getToken } from '../adalConfig';
import { Redirect } from 'react-router-dom'

export class Palette extends Component {
    constructor(props) {
        super(props);
        this.selectPhoto = this.selectPhoto.bind(this);
        this.toggleSelect = this.toggleSelect.bind(this);

        this.state = {
            photos: [] ,
            selectAll: false,
            showInfo: false,
            redirect: false,
        };

        this.GetUserImages = this.GetUserImages.bind(this);
        this.TrashSelectedImages = this.TrashSelectedImages.bind(this);


        this.GetUserImages();
    }

    selectPhoto(event, obj) {
        console.log(obj);
        let photos = this.state.photos;
        photos[obj.index].selected = !photos[obj.index].selected;
        this.setState({ photos: photos });
    }

      toggleSelect() {
        let photos = this.state.photos.map((photo, index) => {
          return { ...photo, selected: !this.state.selectAll };
        });
        this.setState({ photos: photos, selectAll: !this.state.selectAll });
      }

    // get Images with the userid
    GetUserImages() {
        // todo hardcoded for now
        let userid = getCredentials().name;
        axios.get("/api/user/" + userid + "/images", { headers: { 'Authorization': "bearer " + getToken() } })
            .then(res => {
                var images = [];
                res.data.map((image, index) => {
                    images.push({
                        src: "/api/image/" + image.IId, width: 5, height: 4, alt: image.IId, meta: image
                    });
                })
                console.log(res.data);
                this.setState({photos: images})
            })
    }

    TrashSelectedImages() {
        const selected = this.state.photos.filter((value, index, array) => {
            return value.selected;
        })

        const notSelected = this.state.photos.filter((value, index, array) => {
            return !value.selected;
        })

        selected.map((image, index) => {
            image.meta.Trashed = true;
            axios.put("/api/image/" + image.meta.IId, image.meta, { headers: { 'Authorization': "bearer " + getToken() } })
                .then(response => {
                    console.log(response);
                    this.setState({
                        photos: notSelected
                    })
                })
                .catch(error => {
                    console.log(error);
                });
        })
    }

    render() {
        return (
            <div>
            <div>
                <div>
                    <Title title='PALETTE' />
                    <div>{this.renderFunction()}</div>
                </div>
            </div>
            <div id="palcontent">
            {this.renderContent()}
            </div>
            </div>
        );
    }

    renderRedirect = () => {
        let redirectLink = 'edit?src=' + this.state.editImageLink;
        if (this.state.redirect) {
            return <Redirect to={redirectLink} />
        }
    }


    onImageBtnClick = () => {
        const selected = this.state.photos.filter((value, index, array) => {
            return value.selected;
        })

        if (selected.length != 1) {
            alert("select exactly one image");
        } else {
            this.state.editImageLink = selected[0].meta.IId;
            this.setState({
                redirect: true
            })
        }
    }

    // TODO
    renderFunction() {
        return (
            <div class="fnbar">
                {this.renderRedirect()}
                <button>Get Info</button>
                <button onClick={this.onImageBtnClick}>Edit Photo</button>
                <button>Submit</button>
                <button onClick={this.TrashSelectedImages}>Delete</button>
            </div>
        )
    }

    // TODO
    renderContent() {
        return (
            <div class="toggleButton">
                <p>
                    <button onClick={this.toggleSelect}>
                        Select All
              </button>
                </p>
                <Gallery
                    photos={this.state.photos}
                    columns={3}
                    onClick={this.selectPhoto}
                    ImageComponent={SelectedImage}
                    margin={4}
                    direction={"row"}
                />
            </div>
        );
    }
}