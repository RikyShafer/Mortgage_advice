import React, { useEffect, useState } from "react";
import { useAddFileMutation, useAddQueryMutation } from "../QueryAPICalls";
import { useNavigate } from "react-router-dom";
import "./add -questionnaire.css"
import { FaArrowUpFromBracket } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import axios from 'axios';

const AddQuestionnaire = () => {
    const navigate = useNavigate()
    const [addQuery, { isLoading, isError, error }] = useAddQueryMutation();
    const [addFile] = useAddFileMutation();

    const [, setSelectedCity] = useState("");
    const [incompleteFields, setIncompleteFields] = useState(false);
    const { _id, firstName, email, roles } = useAuth();
    const [documentSent, setDocumentSent] = useState(false);

    const [CpaApprovalForCurrentSube, setCpaApprovalForCurrentSube] = useState(null)
    const [uploadSuccess1, setUploadSuccess1] = useState(false);
    const [antecedentModifierMole, setAntecedentModifierMole] = useState(null)
    const [uploadSuccess2, setUploadSuccess2] = useState(false);

    const [adiposityPreviousVariables1, setAdiposityPreviousVariables1] = useState(null)
    const [uploadSuccess3, setUploadSuccess3] = useState(false);

    const [adiposityPreviousVariables2, setAdiposityPreviousVariables2] = useState(null)
    const [uploadSuccess4, setUploadSuccess4] = useState(false);

    const [firstNetSlip, setFirstNetSlip] = useState(null)
    const [uploadSuccess5, setUploadSuccess5] = useState(false);

    const [secondNetSlip, setSecondNetSlip] = useState(null)
    const [uploadSuccess6, setUploadSuccess6] = useState(false);

    const [thirdNetSlip, setThirdNetSlip] = useState(null)
    const [uploadSuccess7, setUploadSuccess7] = useState(false);

    console.log(_id + "id");
    const [formData, setFormData] = useState({
        UserRegister: _id,
        ID: "",
        roCertificateIssueDteles: "",
        dateBirth: "",
        maritalStatus: "",
        education: "",
        hometown: "",
        address: "",
        postalCode: "",
        age: "",
        theirNativeNumber: "",
        passport: "",
        foreignCitizenship: "",
        proximityPublicFigure: "",
        employment: "",
        job: "",
        jobTitle: "",
        seniority: "",
        previousWorkplace: "",
        validityOfApprovalOfCPAFromPreviousYear: "",
        averageIncome: "",

    });

    const getFileById = async (fileId) => {
        try {
            const fileLink = await axios.get(`http://localhost:3297/api/upload/${fileId}`);
            // const fileData = response;
            // filename
            console.log(fileLink.data.filename);

            // console.log(fileData.data.filename);
console.log(fileLink);
            return fileLink.data.filename;
        } catch (error) {
            console.error('Error fetching file by ID:', error);
            throw new Error('Failed to fetch file');
        }
    };
    const uploadFileToBackend = async (file) => {
        try {
            const formFile = new FormData();
            formFile.append('file', file);
            try {
                const response =  await addFile(formFile);
                console.log(response+'response');
                return response.data;
            } catch (error) {
                console.error("Failed to upload file:", error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    
    const updateCpaApprovalForCurrentSube = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const fileData = event.target.result;
                // Send the file data to the backend and handle the response
                uploadFileToBackend(file).then(response => {
                    const fileId = response.id;
                    console.log(fileId);
                    // Save the file ID and data in localStorage
                    localStorage.setItem('CpaApprovalForCurrentSube', fileId);

                    // localStorage.setItem('CpaApprovalForCurrentSube', JSON.stringify({ fileId, fileData }));
                    setCpaApprovalForCurrentSube(fileData);
                    setUploadSuccess1(true);
                }).catch(error => {
                    console.error('Error uploading file:', error);
                    // Handle error
                });
            };
            reader.readAsDataURL(file);
        } else {
            setCpaApprovalForCurrentSube(null);
        }
    };
    const updateAntecedentModifierMole = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const fileData = event.target.result;
                // Send the file data to the backend and handle the response
                uploadFileToBackend(file).then(response => {
                    const fileId = response.id;
                    console.log(fileId);
                    // Save the file ID and data in localStorage
                    // localStorage.setItem('antecedentModifierMole', JSON.stringify({ fileId, fileData }));
                    // setAntecedentModifierMole(fileData);
                    localStorage.setItem('antecedentModifierMole', fileId);
                    // Optionally, store other metadata as needed
                    // localStorage.setItem('antecedentModifierMoleMetadata', JSON.stringify({ filename: file.name, size: file.size }));
                    setAntecedentModifierMole(fileData);
                    setUploadSuccess2(true);
                }).catch(error => {
                    console.error('Error uploading file:', error);
                    // Handle error
                });
            };
            reader.readAsDataURL(file);
        } else {
            setAntecedentModifierMole(null);
        }
        // if (e.target.files) {
        //     setAntecedentModifierMole(e.target.files[0])
        //     localStorage.setItem('antecedentModifierMole', JSON.stringify(e.target.files[0]));
        //     setUploadSuccess2(true);

        // }

        // else
        //     setAntecedentModifierMole(null)
    }
    const updateAdiposityPreviousVariables1 = (e) => {
        // if (e.target.files) {
        //     setAdiposityPreviousVariables1(e.target.files[0])
        //     localStorage.setItem('adiposityPreviousVariables1', JSON.stringify(e.target.files[0]));
        //     setUploadSuccess3(true);

        // }

        // else
        //     setAdiposityPreviousVariables1(null)
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const fileData = event.target.result;
                // Send the file data to the backend and handle the response
                uploadFileToBackend(file).then(response => {
                    const fileId = response.id;
                    console.log(fileId);
                    // Save the file ID and data in localStorage
                    localStorage.setItem('adiposityPreviousVariables1', fileId);

                    // localStorage.setItem('adiposityPreviousVariables1', JSON.stringify({ fileId, fileData }));
                    setAdiposityPreviousVariables1(fileData);
                    setUploadSuccess3(true);
                }).catch(error => {
                    console.error('Error uploading file:', error);
                    // Handle error
                });
            };
            reader.readAsDataURL(file);
        } else {
            setAdiposityPreviousVariables1(null);
        }


    }
    const updateAdiposityPreviousVariables2 = (e) => {
        // if (e.target.files) {
        //     setAdiposityPreviousVariables2(e.target.files[0])
        //     localStorage.setItem('adiposityPreviousVariables2', JSON.stringify(e.target.files[0]));
        //     setUploadSuccess4(true);

        // }

        // else
        //     setAdiposityPreviousVariables2(null)
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const fileData = event.target.result;
                // Send the file data to the backend and handle the response
                uploadFileToBackend(file).then(response => {
                    const fileId = response.id;
                    console.log(fileId);
                    // Save the file ID and data in localStorage
                    localStorage.setItem('adiposityPreviousVariables2', fileId);

                    // localStorage.setItem('adiposityPreviousVariables2', JSON.stringify({ fileId, fileData }));
                    setAdiposityPreviousVariables2(fileData);
                    setUploadSuccess4(true);
                }).catch(error => {
                    console.error('Error uploading file:', error);
                    // Handle error
                });
            };
            reader.readAsDataURL(file);
        } else {
            setAdiposityPreviousVariables2(null);
        }
    }

    const updateFirstNetSlip = (e) => {
        // if (e.target.files) {
        //     setFirstNetSlip(e.target.files[0])

        //     localStorage.setItem('firstNetSlip', JSON.stringify(e.target.files[0]));
        //     setUploadSuccess5(true);

        // }
        // else
        //     setFirstNetSlip(null)

        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const fileData = event.target.result;
                // Send the file data to the backend and handle the response
                uploadFileToBackend(file).then(response => {
                    const fileId = response.id;
                    console.log(fileId);
                    // Save the file ID and data in localStorage
                    localStorage.setItem('firstNetSlip', fileId);

                    // localStorage.setItem('firstNetSlip', JSON.stringify({ fileId, fileData }));
                    setFirstNetSlip(fileData);
                    setUploadSuccess5(true);
                }).catch(error => {
                    console.error('Error uploading file:', error);
                    // Handle error
                });
            };
            reader.readAsDataURL(file);
        } else {
            setFirstNetSlip(null);
        }
    }
    const updateSecondNetSlip = (e) => {
        // if (e.target.files) {
        //     setSecondNetSlip(e.target.files[0])
        //     localStorage.setItem('secondNetSlip', JSON.stringify(e.target.files[0]));
        //     setUploadSuccess6(true);
        // }
        // else
        //     setSecondNetSlip(null)
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const fileData = event.target.result;
                // Send the file data to the backend and handle the response
                uploadFileToBackend(file).then(response => {
                    const fileId = response.id;
                    console.log(fileId);
                    // Save the file ID and data in localStorage
                    localStorage.setItem('secondNetSlip', fileId);

                    // localStorage.setItem('secondNetSlip', JSON.stringify({ fileId, fileData }));
                    setSecondNetSlip(fileData);
                    setUploadSuccess6(true);
                }).catch(error => {
                    console.error('Error uploading file:', error);
                    // Handle error
                });
            };
            reader.readAsDataURL(file);
        } else {
            setSecondNetSlip(null);
        }
    }
    const updateThirdNetSlip = (e) => {
        // if (e.target.files) {
        //     setThirdNetSlip(e.target.files[0])
        //     localStorage.setItem('thirdNetSlip', JSON.stringify(e.target.files[0]));
        //     setUploadSuccess7(true);

        // }
        // else
        //     setThirdNetSlip(null)
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const fileData = event.target.result;
                // Send the file data to the backend and handle the response
                uploadFileToBackend(file).then(response => {
                    const fileId = response.id;
                    console.log(fileId);
                    // Save the file ID and data in localStorage
                    localStorage.setItem('thirdNetSlip', fileId);

                    // localStorage.setItem('thirdNetSlip', JSON.stringify({ fileId, fileData }));
                    setThirdNetSlip(fileData);
                    setUploadSuccess7(true);
                }).catch(error => {
                    console.error('Error uploading file:', error);
                    // Handle error
                });
            };
            reader.readAsDataURL(file);
        } else {
            setThirdNetSlip(null);
        }
    }
    console.log(_id, firstName, email, roles);
    const predefinedCities = [
        "ירושלים",
        "בני ברק",
        "אלעד",
        "טבריה",
        "תל אביב",
        "פתח תקווה",
        "חיפה",
        "גבעת זאב",
        "בית שמש",
        "צפת"
    ];

    const handleSelectCity = (e) => {
        setSelectedCity(e.target.value);
    };

    const cityOptions = predefinedCities.map((city, index) => (
        <option key={index} value={city}>{city}</option>
    ));

    const messageeSubmit = (e) => {
        e.preventDefault();
        console.log("הצליח לצאת מהודעה ");
        setIncompleteFields(false); // Close the square

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newData = { ...prevData, [name]: value };
            localStorage.setItem('formData', JSON.stringify(newData));
            return newData;
        });
    };
    useEffect(() => {
        const retrieveFileData = async () => {
            const savedFormData = JSON.parse(localStorage.getItem('formData'));
            if (savedFormData) {
                setFormData(savedFormData);
            }
            // const cpaApprovalForCurrentSub = localStorage.getItem('CpaApprovalForCurrentSube');
            // if (cpaApprovalForCurrentSub) {
            //     setUploadSuccess1(true);
            //     setCpaApprovalForCurrentSube(cpaApprovalForCurrentSub);
            // }
            // const cpaApprovalForCurrentSub = JSON.parse(localStorage.getItem('CpaApprovalForCurrentSube'));
            const cpaApprovalForCurrentSub = localStorage.getItem('CpaApprovalForCurrentSube');

            if (cpaApprovalForCurrentSub) {
                try {
                    // Extract the file ID from the object stored in localStorage
                    const fileId = cpaApprovalForCurrentSub;
                    // console.log(fileId + "fileId");
            
                    // Retrieve the file data from the backend by its ID
                    const fileData = await getFileById(fileId);
            
                    console.log(fileData + " fileData");
                     const file=fileData
                    setUploadSuccess1(true);
                    setCpaApprovalForCurrentSube(file);
                    // Set the state variables with the retrieved file data
                } catch (error) {
                    console.error('Error retrieving file data:', error);
                }
            }


            // const antecedentModifierMole = localStorage.getItem('antecedentModifierMole');
            // if (antecedentModifierMole) {
            //     setUploadSuccess2(true);
            //     setAntecedentModifierMole(antecedentModifierMole);
            // }
            // const antecedentModifierMole = JSON.parse(localStorage.getItem('antecedentModifierMole'));
            const antecedentModifierMole = localStorage.getItem('antecedentModifierMole');

            if (antecedentModifierMole) {
                try {
                    // Extract the file ID from the object stored in localStorage
                    const fileId = antecedentModifierMole;
                    // console.log(fileId + "fileId");
            
                    // Retrieve the file data from the backend by its ID
                    const fileData = await getFileById(fileId);
            
                    console.log(fileData + " fileData");
                     const file=fileData
                    setUploadSuccess2(true);
                    setAntecedentModifierMole(file);
                    // Set the state variables with the retrieved file data
                } catch (error) {
                    console.error('Error retrieving file data:', error);
                }
            }
            // const adiposityPreviousVariables1 = localStorage.getItem('adiposityPreviousVariables1');
            // if (adiposityPreviousVariables1) {
            //     setUploadSuccess3(true);
            //     setAdiposityPreviousVariables1(adiposityPreviousVariables1);
            // }
            const adiposityPreviousVariables1 = localStorage.getItem('adiposityPreviousVariables1');

            if (adiposityPreviousVariables1) {
                try {
                    // Extract the file ID from the object stored in localStorage
                    const fileId = adiposityPreviousVariables1;
                    // console.log(fileId + "fileId");
            
                    // Retrieve the file data from the backend by its ID
                    const fileData = await getFileById(fileId);
            
                    console.log(fileData + " fileData");
                     const file=fileData
                    setUploadSuccess3(true);
                    setAdiposityPreviousVariables1(file);
                    // Set the state variables with the retrieved file data
                } catch (error) {
                    console.error('Error retrieving file data:', error);
                }
            }
            // const adiposityPreviousVariables2 = localStorage.getItem('adiposityPreviousVariables2');
            // if (adiposityPreviousVariables2) {
            //     setUploadSuccess4(true);
            //     setAdiposityPreviousVariables2(adiposityPreviousVariables2);
            // }
            const adiposityPreviousVariables2 = localStorage.getItem('adiposityPreviousVariables2');

            if (adiposityPreviousVariables2) {
                try {
                    // Extract the file ID from the object stored in localStorage
                    const fileId = adiposityPreviousVariables2;
                    // console.log(fileId + "fileId");
            
                    // Retrieve the file data from the backend by its ID
                    const fileData = await getFileById(fileId);
            
                    console.log(fileData + " fileData");
                     const file=fileData
                    setUploadSuccess4(true);
                    setAdiposityPreviousVariables2(file);
                    // Set the state variables with the retrieved file data
                } catch (error) {
                    console.error('Error retrieving file data:', error);
                }
            }
            // const firstNetSlip = localStorage.getItem('firstNetSlip');
            // if (firstNetSlip) {
            //     setUploadSuccess5(true);
            //     setFirstNetSlip(firstNetSlip);
            // }

            const firstNetSlip = localStorage.getItem('firstNetSlip');

            if (firstNetSlip) {
                try {
                    // Extract the file ID from the object stored in localStorage
                    const fileId = firstNetSlip;
                    // console.log(fileId + "fileId");
            
                    // Retrieve the file data from the backend by its ID
                    const fileData = await getFileById(fileId);
            
                    console.log(fileData + " fileData");
                     const file=fileData
                    setUploadSuccess5(true);
                    setFirstNetSlip(file);
                    // Set the state variables with the retrieved file data
                } catch (error) {
                    console.error('Error retrieving file data:', error);
                }
            }
            // const secondNetSlip = localStorage.getItem('secondNetSlip');
            // if (secondNetSlip) {
            //     setUploadSuccess6(true);
            //     setSecondNetSlip(secondNetSlip);
            // }
            const secondNetSlip = localStorage.getItem('secondNetSlip');

            if (secondNetSlip) {
                try {
                    // Extract the file ID from the object stored in localStorage
                    const fileId = secondNetSlip;
                    // console.log(fileId + "fileId");
            
                    // Retrieve the file data from the backend by its ID
                    const fileData = await getFileById(fileId);
            
                    console.log(fileData + " fileData");
                     const file=fileData
                    setUploadSuccess6(true);
                    setSecondNetSlip(file);
                    // Set the state variables with the retrieved file data
                } catch (error) {
                    console.error('Error retrieving file data:', error);
                }
            }
            // const thirdNetSlip = localStorage.getItem('thirdNetSlip');
            // if (thirdNetSlip) {
            //     setUploadSuccess7(true);
            //     setThirdNetSlip(thirdNetSlip);
            // }

            const thirdNetSlip = localStorage.getItem('thirdNetSlip');

            if (thirdNetSlip) {
                try {
                    // Extract the file ID from the object stored in localStorage
                    const fileId = thirdNetSlip;
                    // console.log(fileId + "fileId");
            
                    // Retrieve the file data from the backend by its ID
                    const fileData = await getFileById(fileId);
            
                    console.log(fileData + " fileData");
                     const file=fileData
                    setUploadSuccess7(true);
                    setThirdNetSlip(file);
                    // Set the state variables with the retrieved file data
                } catch (error) {
                    console.error('Error retrieving file data:', error);
                }
            }
        }
        retrieveFileData();
    }, []);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const requiredFields = ['ID', 'roCertificateIssueDteles', 'dateBirth', 'maritalStatus', 'education', 'hometown', 'address', 'postalCode', 'age', 'theirNativeNumber', 'passport', 'foreignCitizenship', 'proximityPublicFigure', 'employment', 'job', 'jobTitle', 'seniority', 'previousWorkplace', 'validityOfApprovalOfCPAFromPreviousYear', 'averageIncome'];

    //     const isFormComplete = requiredFields.every((field) => formData[field]);

    //     if (!isFormComplete || !CpaApprovalForCurrentSube || !antecedentModifierMole || !adiposityPreviousVariables1 || !adiposityPreviousVariables2 || !firstNetSlip || !secondNetSlip || !thirdNetSlip) {
    //         setIncompleteFields(true);
    //         return;
    //     }

    //     setIncompleteFields(false);

    //     const formDataToSubmit = new FormData();
    //     for (const key in formData) {
    //         formDataToSubmit.append(key, formData[key]);
    //     }
    //     formDataToSubmit.append('UserRegister', _id);
    //     formDataToSubmit.append('cpaApprovalForCurrentSub', CpaApprovalForCurrentSube);
    //     formDataToSubmit.append('antecedentModifierMole', antecedentModifierMole);
    //     formDataToSubmit.append('adiposityPreviousVariables1', adiposityPreviousVariables1);
    //     formDataToSubmit.append('adiposityPreviousVariables2', adiposityPreviousVariables2);
    //     formDataToSubmit.append('firstNetSlip', firstNetSlip);
    //     formDataToSubmit.append('secondNetSlip', secondNetSlip);
    //     formDataToSubmit.append('thirdNetSlip', thirdNetSlip);

    //     try {
    //         await addQuery(formDataToSubmit);
    //         setDocumentSent(true);
    //         setTimeout(() => {
    //             navigate(`/private-area`);
    //         }, 3000);
    //     } catch (error) {
    //         console.error("Error submitting form:", error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const requiredFields = ['ID', 'roCertificateIssueDteles', 'dateBirth', 'maritalStatus', 'education', 'hometown', 'address', 'postalCode', 'age', 'theirNativeNumber', 'passport', 'foreignCitizenship', 'proximityPublicFigure', 'employment', 'job', 'jobTitle', 'seniority', 'previousWorkplace', 'validityOfApprovalOfCPAFromPreviousYear', 'averageIncome'];
    
        const isFormComplete = requiredFields.every((field) => formData[field]);
    
        if (!isFormComplete || !CpaApprovalForCurrentSube || !antecedentModifierMole || !adiposityPreviousVariables1 || !adiposityPreviousVariables2 || !firstNetSlip || !secondNetSlip || !thirdNetSlip) {
            setIncompleteFields(true);
            return;
        }
    
        setIncompleteFields(false);
    
        const formDataToSubmit = new FormData();
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }
        formDataToSubmit.append('UserRegister', _id);
        formDataToSubmit.append('cpaApprovalForCurrentSub', CpaApprovalForCurrentSube);
        formDataToSubmit.append('antecedentModifierMole', antecedentModifierMole);
        formDataToSubmit.append('adiposityPreviousVariables1', adiposityPreviousVariables1);
        formDataToSubmit.append('adiposityPreviousVariables2', adiposityPreviousVariables2);
        formDataToSubmit.append('firstNetSlip', firstNetSlip);
        formDataToSubmit.append('secondNetSlip', secondNetSlip);
        formDataToSubmit.append('thirdNetSlip', thirdNetSlip);
    
        try {
            // Submit the form data
            await addQuery(formDataToSubmit);
            // Clear localStorage items after successful submission
            localStorage.removeItem('formData');
            localStorage.removeItem('CpaApprovalForCurrentSube');
            localStorage.removeItem('antecedentModifierMole');
            localStorage.removeItem('adiposityPreviousVariables1');
            localStorage.removeItem('adiposityPreviousVariables2');
            localStorage.removeItem('firstNetSlip');
            localStorage.removeItem('secondNetSlip');
            localStorage.removeItem('thirdNetSlip');
            setDocumentSent(true);
            setTimeout(() => {
                navigate(`/private-area`);
            }, 3000);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    if (isLoading) return <h1>Loading...</h1>;

    if (isError) {
        // Check if error has response property
        if (error.response && error.response.data && error.response.data.message) {
            return <h2>Error: {error.response.data.message}</h2>;
        } else {
            return <h2>Error: An unknown error occurred</h2>;
        }
    }

    return (

        <div className="Registration-for-the-process">
            {incompleteFields && (
                <div className="message">
                    <div className="messagee">
                        <h1 className="messagee-h1">אופס... נראה שלא מלאתם את כל השדות שימו לב שהעלתם את כל הטפסים שנדרשים כדי שנוכל להמשיך את התהליך</h1>
                        <button type="submit" onClick={messageeSubmit}>הבנתי</button>
                    </div>
                </div>
            )}
            <h1 className="Registration-for-the-process-title">  עכשיו אפשר להתחיל בתהליך, ביחד נגשים לכם את החלום!</h1>

            <div className="Questionnaire-add">

                <form onSubmit={handleSubmit} className="Registration-for-the-process-form" >
                    <div className="Registration-for-the-process-input">
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' >תעודת זהות  </h3>
                            <input
                                type="text"
                                name="ID"
                                value={formData.ID}
                                onChange={handleInputChange}
                                required
                                placeholder='הקלידו כאן... ' />
                        </div>

                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3'  >  תאריך הנפקת תעודת זהות      </h3>
                            <input
                                type="date"
                                value={formData.roCertificateIssueDteles}
                                onChange={handleInputChange}
                                required
                                name="roCertificateIssueDteles"
                                placeholder="בחירה...." />
                        </div>

                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3'  > תאריך לידה </h3>
                            <input
                                type="date"
                                value={formData.dateBirth}
                                onChange={handleInputChange}
                                required
                                name="dateBirth"
                                placeholder="בחירה...." />
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > מצב משפחתי </h3>
                            <select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleInputChange}
                                required
                                defaultValue="" >
                                <option value="" disabled hidden>בחירה....</option>
                                <option value="נשוי">נשוי</option>
                                <option value="בודד">רווק</option>
                                <option value="גרוש">גרוש</option>
                                <option value="אחר">אחר</option>
                            </select>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3'> השכלה</h3>
                            <select name="education" defaultValue=""
                                value={formData.education}
                                onChange={handleInputChange}
                                required>
                                <option value="" disabled hidden>בחירה....</option>
                                <option value="maturity">בגרות</option>
                                <option value="diploma">תעודה</option>
                                <option value="Akamai">אקדמאי</option>
                                <option value="doctorate">דוקטורט</option>
                                <option value="Professor">פרופסור</option>
                            </select>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > עיר מגורים </h3>
                            <select
                                value={formData.selectedCity}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    handleSelectCity(e);
                                }}
                                required
                            >
                                <option value="" disabled hidden>בחירה....</option>
                                {cityOptions}
                                <option value="אחר">אחר</option>
                            </select>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > כתובת מגורים </h3>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                name="address"
                                placeholder="הקלידו כאן..."
                            />
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > מיקוד</h3>
                            <input
                                type="text"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                required
                                name="postalCode"
                                placeholder="הקלידו כאן..."
                            />
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > גיל</h3>
                            <input
                                type="text"
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                                name="age"
                                placeholder="הקלידו כאן..."
                            />
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > מספר ילדים מתחת לגיל 18 </h3>
                            <input
                                type="text"
                                value={formData.theirNativeNumber}
                                onChange={handleInputChange}
                                required
                                name="theirNativeNumber"
                                placeholder="הקלידו כאן..."
                            />
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > מספר דרכון</h3>
                            <input
                                type="text"
                                value={formData.passport}
                                onChange={handleInputChange}
                                required
                                name="passport"
                                placeholder="הקלידו כאן..."

                            />
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > אזרחות זרה </h3>

                            <select
                                name="foreignCitizenship" defaultValue=""
                                value={formData.foreignCitizenship}
                                onChange={handleInputChange}
                                required>
                                <option value="" disabled hidden>בחירה....</option>
                                <option value="true">כן</option>
                                <option value="false">לא</option>
                            </select>
                        </div>

                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3'>קירבה לאיש ציבור </h3>
                            <select
                                name="proximityPublicFigure" defaultValue=""
                                value={formData.proximityPublicFigure}
                                onChange={handleInputChange}
                                required>
                                <option value="" disabled hidden>בחירה....</option>
                                <option value="true">כן</option>
                                <option value="false">לא</option>
                            </select>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > תעסוקה</h3>
                            <input
                                type="text"
                                value={formData.employment}
                                onChange={handleInputChange}
                                required
                                name="employment"
                                placeholder="בחירה...."
                            />

                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > מקום עבודה </h3>
                            <input
                                type="text"
                                value={formData.job}
                                onChange={handleInputChange}
                                required
                                name="job"
                                placeholder=" הקלידו כאן... "
                            />
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > תפקיד בעבודה </h3>
                            <input
                                type="text"
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                                required
                                name="jobTitle"
                                placeholder=" הקלידו כאן... "
                            />
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > וותק</h3>
                            <select
                                name="seniority" defaultValue=""
                                value={formData.seniority}
                                onChange={handleInputChange}
                                required >
                                <option value="" disabled hidden>בחירה....</option>
                                <option value="פחות משנה ">פחות משנה </option>
                                <option value="שנה">שנה</option>
                                <option value="שנתיים">שנתיים</option>
                                <option value="3+">3+</option>
                                <option value="5+">5+</option>
                                <option value="7+">7+</option>
                                <option value="10+">10+</option>
                                <option value="10+">15+</option>
                                <option value="אחר">אחר</option>

                            </select>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > מקום עבודה קודם </h3>
                            <input
                                type="text"
                                value={formData.previousWorkplace}
                                onChange={handleInputChange}
                                required
                                name="previousWorkplace"
                                placeholder=" הקלידו כאן... "
                            />
                        </div>


                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > אישור רו"ח משנה נוכחית </h3>
                            <div className="Registration-for-the-process-form-file">

                                <input onChange={updateCpaApprovalForCurrentSube}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-CpaApprovalForCurrentSube-input" />
                                <label htmlFor="file-CpaApprovalForCurrentSube-input">
                                    {uploadSuccess1 ? 'המסמך הועלה בהצלחה!' : 'העלה...'}                                </label>
                                <label htmlFor="file-CpaApprovalForCurrentSube-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > תוקף האישור </h3>
                            <input
                                type="date"
                                value={formData.validityOfApprovalOfCPAFromPreviousYear}
                                onChange={handleInputChange}
                                required
                                name="validityOfApprovalOfCPAFromPreviousYear"
                                placeholder="בחירה...."
                            />
                        </div>

                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' >אישור רו"ח משנה קודמת </h3>
                            <div className="Registration-for-the-process-form-file">


                                <input onChange={updateAntecedentModifierMole}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-AntecedentModifierMole-input" />
                                <label htmlFor="file-AntecedentModifierMole-input">
                                    {uploadSuccess2 ? 'המסמך הועלה בהצלחה!' : 'העלה...'}                                </label>
                                <label htmlFor="file-AntecedentModifierMole-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > שומה משנה קודמת </h3>
                            <div className="Registration-for-the-process-form-file">

                                <input onChange={updateAdiposityPreviousVariables1}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-AdiposityPreviousVariables1-input" />
                                <label htmlFor="file-AdiposityPreviousVariables1-input">
                                    {uploadSuccess3 ? 'המסמך הועלה בהצלחה!' : 'העלה...'}                                </label>
                                <label htmlFor="file-AdiposityPreviousVariables1-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > שומה משתנים קודמות </h3>
                            <div className="Registration-for-the-process-form-file">
                                <input onChange={updateAdiposityPreviousVariables2}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-AdiposityPreviousVariables2-input" />
                                <label htmlFor="file-AdiposityPreviousVariables2-input">
                                    {uploadSuccess4 ? 'המסמך הועלה בהצלחה!' : 'העלה...'}                                </label>
                                <label htmlFor="file-AdiposityPreviousVariables2-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > תלוש נטו ראשון </h3>
                            <div className="Registration-for-the-process-form-file">
                                <input onChange={updateFirstNetSlip}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-FirstNetSlip-input" />
                                <label htmlFor="file-FirstNetSlip-input">
                                    {uploadSuccess5 ? 'המסמך הועלה בהצלחה!' : 'העלה...'}                                </label>
                                <label htmlFor="file-FirstNetSlip-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > תלוש נטו שני </h3>
                            <div className="Registration-for-the-process-form-file">
                                <input onChange={updateSecondNetSlip}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-SecondNetSlip-input" />
                                <label htmlFor="file-SecondNetSlip-input">
                                    {uploadSuccess6 ? 'המסמך הועלה בהצלחה!' : 'העלה...'}                                </label>
                                <label htmlFor="file-SecondNetSlip-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3'> תלוש נטו שלישי </h3>
                            <div className="Registration-for-the-process-form-file">
                                <input onChange={updateThirdNetSlip}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-ThirdNetSlip-input" />
                                <label htmlFor="file-ThirdNetSlip-input">
                                    {uploadSuccess7 ? 'המסמך הועלה בהצלחה!' : 'העלה...'}                                </label>
                                <label htmlFor="file-ThirdNetSlip-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > הכנסה ממוצעת </h3>
                            <input
                                type="text"
                                value={formData.averageIncome}
                                onChange={handleInputChange}
                                required
                                name="averageIncome"
                                placeholder=" הקלידו כאן... "
                            />
                        </div>

                    </div>
                    <button type="submit"  >אני רוצה להמשיך </button>
                </form>
                {documentSent && (
                    <div className="message">
                        <div className="messagee">
                            <h2 className="documentSent1">הטופס נשלח בצלחה

                            </h2>
                            <h2 className="documentSent2">
                                בימים הקרובים יצור איתך קשר נציג.
                            </h2>
                            <h2 className="documentSent3">
                                תודה
                            </h2>
                        </div>
                    </div>

                )}
            </div>
        </div>

    );
};

export default AddQuestionnaire;
