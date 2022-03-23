import React from 'react';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createSecretAction, deleteSecretAction} from '../../../reducers/action'
import { selectSafeData } from '../../../reducers/safeSelector'
import './DisplaySecrets.css'
import folder from '../../../assets/addfolder.png'
import folderActive from '../../../assets/addfolder-active.png'
import vault from '../../../assets/img-secrets.png'
import secretFolder from '../../../assets/icon-folder.png'
import secretFolderActive from '../../../assets/icon-folder-active.png'


const DisplaySecrets = () =>
{
    const dispatch = useDispatch();
    const safeSelector = useSelector(selectSafeData);
    const [selectedSafe, setSelectedSafe] = useState({});
    const [selectedId, setSelectedId] = useState(null);
    const [openModal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [time, setTime] = useState(Date.now());
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
        clearInterval(interval);
    };
    }, []);
    
    useEffect(()=>{
        const selectSafe = safeSelector.safes.filter(item => item.Id === safeSelector.selectedId)
        setSelectedId(safeSelector.selectedId)
        setSelectedSafe(selectSafe)
        },[safeSelector.safes, safeSelector.selectedId])
    
    const addSecret = (e)=>{
        e.preventDefault();
        const newSecret = {
                Id: new Date().getTime(),
                name: name,
                time: time
        }
        dispatch(createSecretAction(selectedId, newSecret));
        clearForm();
        setModal(false); 
    }

    const changeName = (e)=>{
        setName(e.target.value);
    }

    const deleteSecret = (Id) =>{
        dispatch(deleteSecretAction(selectedId, Id));
    }

    const clearForm = ()=>{
        setName('');
    }


    const cancelAdd = (e)=>{
        e.preventDefault();
        clearForm();
        setModal(false); 
    }

    const timeDiff = (Id) =>{
        let diff = Math.ceil(Math.abs((new Date().getTime() - Id) / 1000));
        if(diff<60)
            return "Created: "+ diff +" seconds "
        else if(diff>60 && diff<3600)
            return "Created: "+ Math.ceil(Math.abs(diff/60)) +" minutes ago"
        else if(diff>3600 && diff<86400)
            return "Created: "+ Math.ceil(Math.abs(diff/3600)) +" hours ago"
        else
            return "Created: "+ Math.ceil(Math.abs(diff/86400)) +" days ago"
    }

    return(
            <div className='secret-container'>
                <div className='top'>
                    <div>Secrets</div>
                    <button onClick={()=>setModal(true)} disabled={(safeSelector.safes.length>0)?false:true}>
                        {
                            (selectedSafe[0]?.Id)?
                            (<img className='folder-active' src={folderActive} alt='secret folder icon'/>):
                            (<img className='folder' src={folder} alt='secret folder icon'/>)
                        }
                    </button>
                </div>
                <hr/>
                {
                     (selectedSafe[0]?.Id && selectedSafe[0]?.secret.length>0)?
                     <p className='safe-count'>{selectedSafe[0]?.secret.length} Safes</p>:
                     <></>
                }
                <div className='secret-list'>
                    {
                        (selectedSafe[0]?.Id && selectedSafe[0]?.secret.length>0) ? selectedSafe[0].secret.map((secretValue, index) =>
                        <div className='list' key={secretValue.Id}>
                            <div className='secret-content'>
                                <img className='folder-icon' src={secretFolder} alt='secret folder icon'/>
                                <img className='folder-icon-active' src={secretFolderActive} alt='secret folder icon'/>
                                    <p>{secretValue.name}<br/>
                                    <span className='time-diff'>
                                        {timeDiff(selectedSafe[0]?.secret[index].Id)}
                                    </span>
                                    </p>
                                <button className='delete-icon' onClick={()=>deleteSecret(secretValue.Id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                            </div>
                            <hr/>
                        </div>) : 
                        <div className='secret-content-empty'>
                            <img className='vault' src={vault} alt='Add secret folder icon'/>
                            <p className='text2'>Add a <span className='normal'>Folder</span> and then you’ll be able to<br/>add <span className='normal'>Secrets</span> to view them all here</p>
                            {
                                (selectedSafe[0]?.Id)?
                                (<button className='add-secret' onClick={()=>setModal(true)}>+Add</button>):
                                (<button className='add-secret-disabled' disabled>+Add</button>)
                            }   
                        </div>
                        
                    }
                </div>
                {
                    openModal&&<div className='form2'>
                    <div className='enter-details'>
                        <h2 className='safe-header'>Add Folder</h2>
                        <form>
                            <label for="Safe Name">Folder Name</label>
                            <input onChange={e=>changeName(e)} type="text" placeholder="Safe Name" name="name" value={name}/>
                            <div className='button-together'>
                                <button onClick={e=>cancelAdd(e)} className='cancel-button'>Cancel</button>
                                {
                                    (!format.test(name))&&name?
                                    <button onClick={e=>addSecret(e)} className='create-button'>Save</button>:
                                    <button disabled className='create-button-disabled'>Save</button>
                                }
                                
                            </div>
                        </form>
                    </div>
                </div>
                }
            </div>
    )
}

export default DisplaySecrets;

