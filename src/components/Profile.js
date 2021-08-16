import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


function Profile({ currentUser }) {
    // const [photo, setPhoto] = useState({ preview: '', raw: '' });
    let { first_name, last_name, image } = currentUser;
    const [savedRecs, setSavedRecs] = useState([]);

    useEffect(() => {
        if (currentUser){
            fetch(`${process.env.REACT_APP_RAILS_URL}/users/${currentUser.id}`)
                .then((r) => r.json())
                .then((user) => {
                    console.log(user)
                    let recs = user.recommendations.filter(rec => rec.saved);
                    if (recs) {
                        let recommendedProducts = recs.map(r => {
                            return user.products.find(p => p.id === r.product_id)
                        })
                        setSavedRecs(recommendedProducts)
                    }
                    
                })
            }
    }, [])
    // useEffect(() => {
    //     // console.log(currentUser.recommendations)
    //     let savedRecs = currentUser.recommendations.filter(rec => rec.saved);
    //     let recommendedProducts = savedRecs.map(r => {
    //                                 return currentUser.products.find(p => p.id === r.product_id);
    //                             });
    //                             // console.log(currentUser.recommendations)
    //     setSavedRecs(recommendedProducts)

    // }, [])




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
        <Container style={{marginRight: "40%"}}>
            <Row>
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
            </Row>


            <Row>
                <div>
                    {savedRecs.length < 1 ? <div><h3>My saved results</h3><br /><p>You don't have any saved products yet! </p></div> :
                        <div>
                            <h2>My saved results</h2>
                            <Container>
                                    <Row>
                            {savedRecs.map(p => (
                           
                                        <Col>
                                            <Card style={{ textAlign:"center", width: '30vw', height: '45vh', padding: "5px", border: "none", borderRadius: "10px", padding: "10px", boxShadow: "10px 10px 42px 0px", marginTop: "70px" }}>
                                                <a href={p.link}> {p.name} </a><br></br>
                                                <img style={{ width: '21vw', height: '32vh', padding:"2px", border:"none", borderRadius: "4px", boxShadow: "5px 5px 20px 5px rgba(50, 40, 40, 0.4)", marginLeft: "14%" }} src={p.image} alt={p.name} />
                                            </Card>
                                        </Col>
                           
                            ))}
                                     </Row>
                                </Container>
                        </div>}

                </div>
            </Row>

        </Container>

    );
}


export default Profile;
