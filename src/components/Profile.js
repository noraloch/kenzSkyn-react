import React, { useState } from "react";

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
    let savedProducts = [];
    if (currentUser.recommendations.length > 0) {
        currentUser.recommendations.map(r => {
            if (r.saved) {
                currentUser.products.map(p => {
                    if (r.product_id === p.id) {
                        savedProducts.push(p)
                    }
                });
            }
        })
    };
    // currentUser.recommendations.map(p => {
    //     if (p.saved) {
    //         savedProducts = <div>
    //             <a href={p.link}> {p.name} </a>
    //             <img src={p.image} alt={p.name} />
    //         </div>
    //     }
    //     else {
    //         savedProducts = "You don't have any saved products to show!"
    //     }
    // });


    return (
        <>
            <div>
                <label htmlFor="upload-button">
                    {photo.preview ? <img src={photo.preview} alt="img" style={{ size: "20%" }} /> : (
                        <>
                            <span>Import a photo</span>
                        </>)}
                </label>
                <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange} />
                <br /><br />
                <button onClick={handleUpload}>Upload</button>
                <div>
                    {photo ? <img src={image} /> : null}
                    <h4>First Name</h4><p>{first_name}</p>
                    <h4>Last Name</h4><p>{last_name}</p>
                </div>

            </div>

            <div>
                <h2>My Saved Products</h2>
                <div>
                    {savedProducts.map(p => (
                        <div>
                            <a href={p.link}> {p.name} </a>
                            <img src={p.image} alt={p.name} />
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};


export default Profile;
