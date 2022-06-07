import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Question1 = () => {

    const [idCarbyCountry, setIdCarbyCountry] = useState({});
    const [numCarByCountry, setNumCarByCountry] = useState([]);
    const [numAndIdbyUSA, setNumAndIdbyUSA] = useState({number: null, id: []});
    const [numAndIdbyEU, setNumAndIdbyEU] = useState({number: null, id:[]});


    useEffect(()=> {
        const getData = async() => {
            const res = await fetch('https://gist.githubusercontent.com/ak1103dev/2c6c1be69300fa0717c62b9557e40e75/raw/0dc78ed8783f4c54345ee3eeac410d26805d2dbc/data.txt');
            const textData = await res.text()
            const actualData = textData.slice(0, textData.length-2).slice(2)
            const jsonData = await JSON.parse(actualData)
            
            const countryInEU = ['Italy', 'Germany', 'France', 'Romania', 'Netherlands', 'Spain', 'Sweden', 'Czech Republic', 'Austria', 'Denmark']
            let idResults = {}; 
            let carByCountry = []; 
            let carByUSA = {number: null, id: []}; 
            let carByEU = {number: null, id: []};

            for (const res of jsonData.Makes) { 
                if (res.make_country in idResults) { 
                    if (!(res.make_id in idResults[res.make_country])){ 
                        idResults[res.make_country].push(res.make_id)
                    }
                } 
                 else { 
                    idResults[res.make_country] = [res.make_id] 
                }
            }
            setIdCarbyCountry(idResults);

            for (const country of Object.keys(idResults)) { 
                carByCountry.push({[country] : Object.keys(idResults[country]).length}) 
            }
            setNumCarByCountry(carByCountry);

            carByUSA['number'] = Object.keys(idResults['USA']).length;
            carByUSA['id'] = idResults['USA'] ;
            setNumAndIdbyUSA(carByUSA);
            
            for (const country of Object.keys(idResults)) {
                if (countryInEU.includes(country)) {
                    carByEU.id.push(...idResults[country])
                }
            }

           carByEU.id = carByEU.id.filter((value, index, array) => array.indexOf(value) === index)
           carByEU.number = carByEU.id.length;
           setNumAndIdbyEU(carByEU) 
       }

       getData()
    }, []) 

  return (
    <div className='question-section'>
        <div className="question">
            <h1 className='question-title question-title-1'>
                Q.1 แต่ละประเทศผลิตรถกี่ยี่ห้อ
            </h1>
            <div className='question-content question-content-1'>
                {numCarByCountry.map((country) => {
                    return (
                        <p className='question-answer-1'>{Object.keys(country)} : {Object.values(country)} ยี่ห้อ</p>
                    )
                })}
            </div>
           
            
        </div>
        <div className="question">
            <h1 className='question-title question-title-2'>
                Q.2 แต่ละประเทศมีรถยี่ห้ออะไรบ้าง
            </h1>
            <div className='question-content question-content-2'>
                {Object.keys(idCarbyCountry).map((country) => {
                    return (
                        
                        <p className='question-answer-2'><span className='question-answer-2-title'> {country} </span> : {idCarbyCountry[country].join(', ')}</p>
                    )
                })}
            </div>
            
        </div>
        <div className="question">
            <h1 className='question-title question-title-3'>
                Q.3 USA ผลิตรถกี่ยี่ห้อ ยี่ห้ออะไรบ้าง
            </h1>
            <div className='question-content question-content-3'>
                <p className='question-answer-3-title'>USA ผลิตรถทั้งหมด {numAndIdbyUSA.number} ยี่ห้อ มีดังนี้</p>
                <div  className='question-answer-3-content-box'>
                    <p>{numAndIdbyUSA.id.join(', ')}</p>
                </div>
                
            </div>
            
        </div>
        <div className="question">
            <h1 className='question-title question-title-4'>
                Q.4 รถยุโรป มีกี่ยี่ห้อ ยี่ห้ออะไรบ้าง
            </h1>
            <div className='question-content question-content-4'>
                <p className='question-answer-4-title'>EU ผลิตรถทั้งหมด {numAndIdbyEU.number} ยี่ห้อ มีดังนี้</p>
                <div  className='question-answer-4-content-box'>
                    <p>{numAndIdbyEU.id.join(', ')}</p>
                </div>
            </div>
        </div>

        <div className='router-box'>
            <Link className='router_link' to="/question2">Next</Link>
        </div>
    </div>
   

  )
}

export default Question1

 