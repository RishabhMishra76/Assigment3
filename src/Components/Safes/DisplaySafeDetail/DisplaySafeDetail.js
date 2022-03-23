

import React from 'react';
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { selectSafeData} from '../../../reducers/safeSelector'
import './DisplaySafeDetail.css'


const DisplaySafeDetail = ()=> {
    const safeSelector = useSelector(selectSafeData);
    const selectedIdSelector = useSelector(selectSafeData);
    const [safe, setSafe] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedSafe , setSelectedSafe] = useState(null);
    useEffect(()=>{
        setSafe(safeSelector.safes)
        setSelectedId(selectedIdSelector.selectedId)
        let newSelectedSafe = safeSelector.safes.filter((item)=>item.Id===selectedIdSelector.selectedId)
        setSelectedSafe(newSelectedSafe)
        },[selectedIdSelector.selectedId,safeSelector.safes])
        
    return (
        <div className='body'>
            {
                safe.length ? 
                (<div className='content'  key={selectedSafe[0]?.Id}>
                    <p className='heading'>{selectedSafe[0]?.name}</p>
                    <p className='text'>{selectedSafe[0]?.Description}</p>
                </div>) : 
                (<div className='content'>
                    <p className='heading'>No Safes Created</p>
                    <p className='text'>Create a Safe to see your secrets, folders and permissions here</p>
                </div>)
            }
        </div>
    )
}

export default DisplaySafeDetail;