import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Question1 = () => {

    const [idCarbyCountry, setIdCarbyCountry] = useState({});
    const [numCarByCountry, setNumCarByCountry] = useState([]);
    const [numAndIdbyUSA, setNumAndIdbyUSA] = useState({});
    const [numAndIdbyEU, setNumAndIdbyEU] = useState({});


    useEffect(()=> {
        const getData = async() => {
            const res = await fetch('https://gist.githubusercontent.com/ak1103dev/2c6c1be69300fa0717c62b9557e40e75/raw/0dc78ed8783f4c54345ee3eeac410d26805d2dbc/data.txt');
            const textData = await res.text()
            const actualData = await textData.slice(0, textData.length-2).slice(2)
            const jsonData = await JSON.parse(actualData)
            
            const countryInEU = ['Italy', 'Germany', 'France', 'Romania', 'Netherlands', 'Spain', 'Sweden', 'Czech Republic', 'Austria', 'Denmark']
            let idResults = {}; //object  {ประเทศ : [รถที่ผลิต]}
            let carByCountry = []; //array [{ประเทศ: จำนวนรถที่ผลิต},...]
            let carByUSA = {number: null, id: []}; 
            let carByEU = {number: null, id: []};

            for (const res of jsonData.Makes) { // loop object
                if (res.make_country in idResults) { // เช็คว่ามีรถใน object หรือยัง มีแล้ว
                    if (!(res.make_id in idResults[res.make_country])){ // ถ้ารถยังไม่มีเพิ่มเข้าไป
                        idResults[res.make_country].push(res.make_id)
                    }
                } 
                 else { //ประเทศยังไม่มีอยู่ใน object เลยเพิ่มทั้งประเทศและรถเข้าไป
                    idResults[res.make_country] = [res.make_id] 
                }
            }
            await setIdCarbyCountry(idResults);

            for (const country of Object.keys(idResults)) { // แต่ละประเทศผลิตกี่ยี่ห้อ
                carByCountry.push({[country] : Object.keys(idResults[country]).length}) //ดูจำนวนที่ผลิตจากความยาวของ value
            }
            await setNumCarByCountry(carByCountry);

            carByUSA['number'] = Object.keys(idResults['USA']).length;
            carByUSA['id'] = idResults['USA'] ;
            await setNumAndIdbyUSA(carByUSA);

           for (const country of Object.keys(idResults)) {
               for (const EUcountry of countryInEU){
                   if (country === EUcountry) {
                        carByEU.id.push(...idResults[country])
                   }
               }  
           }
           carByEU.id = carByEU.id.filter((value, index, array) => array.indexOf(value) === index); // check unique
           carByEU.number = carByEU.id.length;
           await setNumAndIdbyEU(carByEU) 
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
                {typeof(numAndIdbyUSA.id) !== "undefined" && 
                    <p>{numAndIdbyUSA.id.join(', ')}</p>
                }
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
                {typeof(numAndIdbyEU.id) !== "undefined" && 
                    <p>{numAndIdbyEU.id.join(', ')}</p>
               }                
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

