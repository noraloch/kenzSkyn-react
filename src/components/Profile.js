import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Profile({ currentUser }) {
    const [photo, setPhoto] = useState({ preview: '', raw: '' });
    let { first_name, last_name, image } = currentUser;

    const handleChange = (e) => {
        e.persist()
        if (e.target.files.length) {
            setPhoto({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        };
    };

    console.log(photo);
    const handleUpload = async e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("image", photo.raw);
        await fetch("http://localhost:3000/photos", {
            method: "POST",
            body: formData
        }).catch(error => console.log(error));


    };

    // let rec = [];
    // if (recommendations.length > 1){
    //     rec = recommendations.map(r => r.products).map(p => <li>{p.name}</li>);
    // }else{
    //     return "You don't have any saved products!"
    // };


    return (
        <>
            <div>
                <label htmlFor="upload-button">
                    {photo.preview ? <img src={photo.preview} /> : (
                        <>
                            <span>Upload your photo</span>
                        </>)}
                </label>
                <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange} />
                <br />
                <button onClick={handleUpload}>Upload</button>
            </div>

            <div>
                {photo ? <img src={image} /> : null}
                <h3>First Name</h3><p>{first_name}</p>
                <h3>Last Name</h3><p>{last_name}</p>
            </div>

            <div>
                <h2>My Saved Products</h2>
                <ul>
                    {currentUser.recommendations.length > 0 ?
                        currentUser.recommendations.map(r => <li>{r.id}</li>) :
                    "You don't have any saved products!"}
                </ul>
            </div>
        </>

    );
};


export default Profile;

