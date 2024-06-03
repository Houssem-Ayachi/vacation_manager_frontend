import { useState } from 'react'

import ContactTypesRequests from '../../../../../utils/Requests/Contact Types/Contact_Types.Requests'
import { CreateContactTypeType } from '../../../../../utils/Requests/Contact Types/Contact_Types.Requests.Object'

const defaultCreateContactTypeOBJ: CreateContactTypeType = {
  type: "",
  value_type: ""
}

type Props = {
  addNewContactTypeToList: (contactType: CreateContactTypeType) => void
}

function CreateContactTypes({addNewContactTypeToList}: Props) {

  const CTREQ = new ContactTypesRequests();

  const [contactType, setContactType] = useState(defaultCreateContactTypeOBJ);
  const [error, setError] = useState("");

  const createContactType = async () => {
    let k: keyof typeof contactType;
    //checking if any field is empty
    for(k in contactType){
        if(contactType[k] === defaultCreateContactTypeOBJ[k]){        
            setError(`field: ${k.replace("_", " ")} has to be filled`);
            return;
        }
    }
    const response = await CTREQ.createContactType(contactType);
    if(response.error){
      return setError(response.message);
    }
    addNewContactTypeToList(response);
    alert("successefully created");
  }

  return (
    <div>
      <h3 className='mb-2 font-bold'>Create new Contact Type:</h3>
      <div>
        <input className='border-2 rounded p-1 mr-1 mt-1' type="text" placeholder='type' onChange={e => setContactType({...contactType, type: e.target.value})} value={contactType.type}/>
        <input className='border-2 rounded p-1 mr-1 mt-1' type="text" placeholder='value_type' onChange={e => setContactType({...contactType, value_type: e.target.value})} value={contactType.value_type}/>
        <button className='border-2 rounded  bg-cyan-500 w-full text-white' onClick={createContactType}><i className="fa-regular fa-square-plus mr-1"></i>add</button>
      </div>
      <p className='bg-red-600 text-slate-100'>{error}</p>
    </div>
  )
}

export default CreateContactTypes
