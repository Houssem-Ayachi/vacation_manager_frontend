import {useState, useEffect} from 'react'

import ContactTypesRequests from '../../../../utils/Requests/Contact Types/Contact_Types.Requests';
import { CreateContactTypeType } from '../../../../utils/Requests/Contact Types/Contact_Types.Requests.Object';
import ContactRequest from '../../../../utils/Requests/Contacts/Contacts.Requests';
import { CreateContactOBJ, contactOBJ } from '../../../../utils/Requests/Contacts/Contacts.Requests.Object';

const defaultContactTypes: CreateContactTypeType[] = [];
const defaultContactOBJ: CreateContactOBJ = {
  value: "",
  contact_type_id: ""
}

type Props = {
  addNewContactData: (contact: contactOBJ) => void
}

function CreateContact({addNewContactData}: Props) {

  const contactTypesReq = new ContactTypesRequests();
  const contactRequest = new ContactRequest();

  const [contactData, setContactData] = useState(defaultContactOBJ);
  const [contactTypes, setContactTypes] = useState(defaultContactTypes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContactTypes = async () => {
    const response = await contactTypesReq.getContactsTypes();
    setContactTypes(response);
    setLoading(false);
  }

  const createContact = async () => {
    setError("");
    if(contactData.value === ""){
      return setError("contact value has to be filled");
    }else if(contactData.contact_type_id === ""){
      return setError("contact type has to be filled");
    }
    const response = await contactRequest.createContact(contactData);
    if(response.error){
      setError(response.message);
    }
    addNewContactData(response);
  }

  useEffect(() => {
    loadContactTypes();
  }, []);

  return (
    <div>
      <h4 className='mb-4'>Create Contact:</h4>
      {loading ? 
        <h1>Loading</h1>
        :
        <div className=''>
          <select className='text-xl rounded border-2 border-black p-1' name="" id="" placeholder='' onChange={(e) => setContactData({...contactData, contact_type_id: e.target.value})}>
            <option value="">Contacts' Types</option>
            {contactTypes.map(contactType => 
              <option value={contactType.type} key="">{contactType.type}</option>
            )}
          </select>
          <div className=''>
            <input className=" border-2 p-1 text-xl rounded w-full" type="text" placeholder='contact value' value={contactData.value} onChange={e => setContactData({...contactData, value: e.target.value})}/>
            <button className='border-2 rounded  bg-cyan-500 w-full text-white' onClick={createContact}><i className="fa-regular fa-square-plus mr-1"></i>Add</button>
          </div>
          <div className='flex justify-center mt-2'>
            {error === "" ? "" : <p className='bg-red-600 text-slate-100 rounded-lg p-1'>{error}</p>}                            
          </div>
        </div>
      }
    </div>
  )
}

export default CreateContact;
