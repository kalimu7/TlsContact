import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import '../style/Userplatform.css';
import axios from 'axios';
function UserPlatform() {
    const [notification,setnotification] = useState(''); 
    const [Firstname, setdata] = useState('');
    // const [Lastname,setlname] = useState('');
    const [id, setid] = useState('');
    const [ref, setrefe] = useState('');
    const [Data, setinfo] = useState({id:'', Firstname: '', Lastname: '', dateofbirth: '', nationality: '', familystatus: '', address: '', visatype: '', Dateofdeparture: '', traveldocumenttype: '', traveldocumentnumber: '', Dateofarrival: '' });
    useEffect(() => {
        setdata(localStorage.getItem('name'));
        // setlname(localStorage.getItem('lname'));
        setid(localStorage.getItem('id'));
        setrefe(localStorage.getItem('ref'));
    }, [])
    

    const handlesubmit = (e) => {
        // console.log(Data)
        e.preventDefault();
        // console.log(Data);
        
        axios.post('http://localhost/TlsContact/public/User/modi',Data).
        then(
            (res)=>{console.log(res.data);
            if(res.data.upd === 'updated successfully'){
                setnotification('updated successfully');
            }else{
                setnotification('not updated');
            }
        }
        )
        .catch(
            err=>console.log(err)
            )

    }

    useEffect(() => {
        if (ref) {
            axios.get(`http://localhost/TlsContact/public/User/update/${ref}`).then(
                (res) => {
                    console.log(res.data);
                    setinfo(res.data);
                }
            ).catch(
                (err) => { console.log(err) }
            )
        }
    }, [ref])

    // ********************************countries******************
    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];

    const arr = countryList.map((country, index) => {
        return (
            <option key={index} value={country}>{country}</option>
        )
    })
    // ********************************countries******************
    const handlechange = (event) => {
        setinfo({ ...Data, [event.target.name]: event.target.value });
        const val = event.target.value;
        console.log(val);
    };

    return (
        <div className='contentuser'>
            <div className='  '>
                <p>
                    <Link className='text-danger' to="">Edit profile</Link> <br />
                    <Link className='text-success' to="">delete profile</Link>
                </p>
            </div>
            <div className="update container forcont d-flex justify-content-center align-items-center my-3">

                <form className='py-5'>

                    <span className='text-success' >{notification}</span>
                    <div class="mb-3">
                        <h5 className='text-danger' ></h5>
                        <label for="exampleInputEmail1" class="form-label">First Name</label>
                        <input onChange={handlechange} type="text" name='Firstname' value={Data.Firstname} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Last Name</label>
                        <input type="text" onChange={handlechange} name='Lastname' value={Data.Lastname} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Date of birth</label>
                        <input onChange={handlechange} type="date" name='dateofbirth' value={Data.dateofbirth} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Nationality</label> <br />
                        <select onChange={handlechange} name='nationality' value={Data.nationality} class="form-select form-select-sm" aria-label=".form-select-sm example" >
                            {/* <option selected>{Data.nationality}</option> */}
                            {arr}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Family Status</label>
                        <select onChange={handlechange} name='familystatus' value={Data.familystatus} class="form-select form-select-sm" aria-label=".form-select-sm example" >
                            <option value="single" >Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Adress</label>
                        <input type="text" onChange={handlechange} value={Data.address} name='address' class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Visa Type</label>
                        <select onChange={handlechange} value={Data.visatype} name="visatype" class="form-select form-select-sm" aria-label=".form-select-sm example" >
                            {/* <option  value="Tourism" >select</option> */}
                            <option value="Tourism" >Tourism</option>
                            <option value="Student">Student</option>
                            <option value="Temporary worker">Temporary worker</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Date Of departure</label>
                        <input onChange={handlechange} value={Data.Dateofdeparture} type="date" name='Dateofdeparture' class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Date Of Arrival</label>
                        <input onChange={handlechange} value={Data.Dateofarrival} type="date" name='Dateofarrival' class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Travel Documentary Type</label>
                        <select onChange={handlechange} value={Data.traveldocumenttype} name="traveldocumenttype" class="form-select form-select-sm" aria-label=".form-select-sm example" >
                            <option value="Passport">Select</option>
                            <option value="Passport">Passport</option>
                            <option value="idntity document">identity document</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Travel Documentary Number</label>
                        <input onChange={handlechange} value={Data.traveldocumentnumber} type="text" name='traveldocumentnumber' class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" class="btn btn-primary rounded-pill px-5 py-2" onClick={handlesubmit} > Submit</button>
                        <Link to={`http://localhost/TlsContact/public/User/remove/${Data.id}`} className="btn btn-danger rounded-pill px-5 py-2">Delete</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserPlatform