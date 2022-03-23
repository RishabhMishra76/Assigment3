import React from 'react';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {selectSafeData} from '../../../reducers/safeSelector'
import {createSafeAction, deleteSafeAction, selectIDAction, updateSafeAction} from '../../../reducers/action'
import './AddSafeForm.css'
import search from '../../../assets/icon-search.png'
import SafeIcon from '../../../assets/icon-safes.png'
import AddIcon from '../../../assets/addsafe.png'
import emptyList from '../../../assets/emptylist.png'


const AddSafeForm = () =>
{
    const dispatch = useDispatch();
    const safeSelector = useSelector(selectSafeData);
    const [safe, setSafe] = useState([]);
    const [openModal, setModal] = useState(false);
    const [openUpdateModal, setUpdateModal] = useState(false);
    const [name, setName] = useState('');
    const [ownerName, setOwner] = useState('');
    const [Type, setType] = useState('');
    const [Description, setDescription] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [Id, setId] = useState(null);
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
        clearInterval(interval);
    };
    }, []);

    useEffect(()=>{
        setSafe(safeSelector.safes)
        },[safeSelector.safes])

    useEffect(()=>{
        setSelectedId(safeSelector.selectedId)
        },[safeSelector.selectedId])
    
    const addSafe = (e)=>{
        e.preventDefault();
        const newSafe = {
                Id: new Date().getTime(),
                name: name,
                Description: Description,
                ownerName: ownerName,
                Type: Type,
                timeStamp: new Date().getTime(),
                time: time,
                secret:[]
        }
        dispatch(createSafeAction(newSafe));
        dispatch(selectIDAction(newSafe.Id));
        clearForm();
        setModal(false); 
    }

    const updateSafe = (e)=>{
        e.preventDefault();
        const updatedSafe = {
                Id: Id,
                name: name,
                Description: Description,
                ownerName: ownerName,
                Type: Type,
                timeStamp: new Date().getTime(),
                secret:[]
        }
        dispatch(updateSafeAction(Id, updatedSafe));
        dispatch(selectIDAction(updatedSafe.Id));
        clearForm();
        setUpdateModal(false); 
    }

    const cancelAdd = (e)=>{
        e.preventDefault();
        clearForm();
        setModal(false);
        setUpdateModal(false);
    }

    const clearForm = ()=>{
        setName('');
        setOwner('');
        setType('');
        setDescription('');
    }

    const changeName = (e)=>{
        setName(e.target.value);
    }

    const changeOwner = (e)=>{
        setOwner(e.target.value);
    }

    const changeType = (e)=>{
        setType(e.target.value);
    }

    const changeDescription = (e)=>{
        setDescription(e.target.value);
    }

    const deleteSafe = (Id) =>{
        dispatch(deleteSafeAction(Id));
    }

    const editSafe = (data) =>{
        setUpdateModal(true)
        setName(data.name);
        setOwner(data.ownerName);
        setType(data.type);
        setDescription(data.Description);
        setId(data.Id);
    }

    

    const selectSafe = (Id) =>{
        dispatch(selectIDAction(Id));
    }

    const timeDiff = (timeStamp) =>{
        let diff = Math.ceil(Math.abs((new Date().getTime() - timeStamp) / 1000));
        if(diff<60)
            return "Last updated: "+ diff +" seconds "
        else if(diff>60 && diff<3600)
            return "Last updated: "+ Math.ceil(Math.abs(diff/60)) +" minutes ago"
        else if(diff>3600 && diff<86400)
            return "Last updated: "+ Math.ceil(Math.abs(diff/3600)) +" hours ago"
        else
            return "Last updated: "+ Math.ceil(Math.abs(diff/86400)) +" days ago"
    }


    return(
            <div>
                <div className='header'>
                    <p>All Safes <span className='gray'>({safe.length})</span></p>
                    <div className='search-container'>
                        <img src={search} alt='search icon'/>
                        <input type="text" placeholder="Search" name="search"/>
                    </div>
                </div>
                <hr/>
                <div className='safe-list'>
                {
                    safe.length ? safe.map((safeValue) => 
                    (<div className={safeValue.Id===selectedId ? "selected-safe" : "unselected-safe"} onClick={()=>selectSafe(safeValue.Id)} key={safeValue.Id}>
                        <img src={SafeIcon} alt='safe-icon'></img>
                        <p> 
                            {safeValue.name}<br/>
                            <span className='time-diff'>
                                {timeDiff(safeValue.timeStamp)}
                            </span>
                        </p>
                        {
                            safeValue.Id===selectedId?
                            <span className='icons'>
                                <button onClick={()=>editSafe(safeValue)}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                <button onClick={()=>deleteSafe(safeValue.Id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                            </span>:<></>
                        }
                    </div>))
                    : 
                    (<div className="empty-list">
                        <img src={emptyList} alt='Empty List Icon'/>
                        <p>Create a Safe to get started!</p>
                        <button onClick={()=>setModal(true)} >
                            <img className='Addbutton-empty' src={AddIcon} alt='safe-icon'/>
                        </button>
                    </div>)
                }
                </div>
                {
                    (safe.length>0)?
                    (<button onClick={()=>setModal(true)} >
                        <img className='Addbutton' src={AddIcon} alt='safe-icon'/>
                    </button>):(<></>)
                }
                {
                    openModal&&<div className='form'>
                        <div className='enter-details'>
                            <h2 className='safe-header'>Create Safe</h2>
                            <div className='together'>
                                <img src={SafeIcon} alt='safe-icon'></img>
                                <p>A Safe is a logical unit to store the secrets. All the safes are created within Vault. You can control access only at the safe level. As a vault administrator you can manage safes but cannot view the content of the safe.</p>
                            </div>
                            <form>
                                <label for="Safe Name">Safe Name</label>
                                <input onChange={e=>changeName(e)} type="text" placeholder="Safe Name" name="name" value={name}/>
                                <label for="Owner">Owner</label>
                                <input onChange={e=>changeOwner(e)} type="text" placeholder="Owner" name="owner" value={ownerName}/>
                                <label for="Type">Type</label>
                                <select onChange={e=>changeType(e)} name="type" value={Type}>
                                    <option value="Personal">Personal</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label for="Description">Description</label>
                                <input className='description' onChange={e=>changeDescription(e)} type="text" placeholder="Description" name="description" value={Description}/>
                                <label className='description-value' for="Description Value">Please add a minimum of 10 characters</label>
                                <div className='button-together'>
                                    <button onClick={e=>cancelAdd(e)} className='cancel-button'>Cancel</button>
                                    {
                                        (name && ownerName && Description.length>10)?
                                        (<button onClick={e=>addSafe(e)} className='create-button'>+Create</button>):
                                        (<button disabled className='create-button-disabled'>+Create</button>)
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                }
                {
                    openUpdateModal&&<div className='form'>
                        <div className='enter-details'>
                            <h2 className='safe-header'>Create Safe</h2>
                            <div className='together'>
                                <img src={SafeIcon} alt='safe-icon'></img>
                                <p>A Safe is a logical unit to store the secrets. All the safes are created within Vault. You can control access only at the safe level. As a vault administrator you can manage safes but cannot view the content of the safe.</p>
                            </div>
                            <form>
                                <label for="Safe Name">Safe Name</label>
                                <input onChange={e=>changeName(e)} type="text" placeholder="Safe Name" name="name" value={name}/>
                                <label for="Owner">Owner</label>
                                <input onChange={e=>changeOwner(e)} type="text" placeholder="Owner" name="owner" value={ownerName}/>
                                <label for="Type">Type</label>
                                <select onChange={e=>changeType(e)} name="type" value={Type}>
                                    <option value="Personal">Personal</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label for="Description">Description</label>
                                <input onChange={e=>changeDescription(e)} type="text" placeholder="Description" name="description" value={Description}/>
                                <div className='button-together'>
                                    <button onClick={e=>cancelAdd(e)} className='cancel-button'>Cancel</button>
                                    {
                                        (name && ownerName && Description.length>10)?
                                        (<button onClick={e=>updateSafe(e)} className='create-button'>Update</button>):
                                        (<button disabled className='create-button-disabled'>Update</button>)
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
    )
}

export default AddSafeForm;

