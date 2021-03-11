import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Profile({ currentUser }) {
    // const [photo, setPhoto] = useState({ preview: '', raw: '' });
    let { first_name, last_name, image } = currentUser;
    const [savedRecs, setSavedRecs] = useState([]);
 
    useEffect(() => {
        fetch(`http://localhost:3000/users/${currentUser.id}`)
            .then((r) => r.json())
            .then((user) => {

                let recs = user.recommendations.filter(rec => rec.saved)
                let recommendedProducts = recs.map(r => {
                    return user.products.find(p => p.id === r.product_id)
                })
                        
                console.log(recommendedProducts);
                setSavedRecs(recommendedProducts)
            })
    }, [])


    console.log(savedRecs)


    // const handleChange = (e) => {
    //     e.persist()
    //     if (e.target.files.length) {
    //         setPhoto({
    //             preview: URL.createObjectURL(e.target.files[0]),
    //             raw: e.target.files[0]
    //         });
    //     };
    // }


    // const handleUpload = async e => {
    //     e.preventDefault();
    //     let formData = new FormData();
    //     formData.append("image", photo.raw);
    //     await fetch("http://localhost:3000/photos", {
    //         method: "POST",
    //         body: formData
    //     }).catch(error => console.log(error));


    // };

    return (
        <>
            <div>
                {/* <label htmlFor="upload-button">
                    {photo.preview ? <img src={photo.preview} alt="img" style={{ size: "20%" }} /> : (
                        <>
                            <span>Import a photo</span>
                        </>)}
                </label>
                <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange} />
                <br /><br />
                <button onClick={handleUpload}>Upload</button> */}
                <div>
                    {/* {photo ? <img src={image} /> : null} */}
                    <h4>First Name</h4><p>{first_name}</p>
                    <h4>Last Name</h4><p>{last_name}</p>
                </div>

            </div>

            <div>
                {savedRecs.length < 1 ? <h3>You don't have any saved products yet! Take our 20 second skincare quiz, in order to be able to save your favorite recommended products. </h3> :
                    <div>
                        <h2>My Saved Products</h2>
                        {savedRecs.map(p => (
                            <div>
                                <a href={p.link}> {p.name} </a>
                                <img src={p.image} alt={p.name} />
                            </div>
                        ))}
                    </div>}
            </div>
        </>

    );
}


export default Profile;
