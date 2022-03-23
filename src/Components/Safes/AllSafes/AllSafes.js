
import AddSafeForm from '../AddSafeForm/AddSafeForm'
import DisplaySafeDetail from '../DisplaySafeDetail/DisplaySafeDetail'
import DisplaySecrets from '../DisplaySecrets/DisplaySecrets'
import './AllSafes.css'


const AllSafes = ()=>{

    return(
        <div className='structure'>
            <div className='component1'>
                <AddSafeForm/>
            </div>
            <div className='component2'>
                <DisplaySafeDetail/>
                <DisplaySecrets/>
            </div>
        </div>
    );
}

export default AllSafes;

