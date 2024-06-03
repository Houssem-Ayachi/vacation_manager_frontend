import {useState, useEffect} from "react"

import ContactTypesRequests from "../../../../../utils/Requests/Contact Types/Contact_Types.Requests";
import { CreateContactTypeType } from "../../../../../utils/Requests/Contact Types/Contact_Types.Requests.Object";

import CreateContactTypes from "./CreateContactTypes";
import ContactType from "./ContactType";

const defaultCotactTypesListOBJ: CreateContactTypeType[] = [];

function ContactTypesList() {
  const contactTypesReq = new ContactTypesRequests();

  const [loading, setLoading] = useState(true);
  const [contactTypes, setContactTypes] = useState(defaultCotactTypesListOBJ);
  const [error, setError] = useState("");

  const getContactTypes = async () => {
    const response = await contactTypesReq.getContactsTypes();
    setLoading(false);
    if(response.error){
      return setError(response.message);
    }
    setContactTypes(response);
  }

  const addNewContactTypeToList = (contactType: CreateContactTypeType) => {
    setContactTypes([...contactTypes, contactType]);
  }

  const deleteContactType = async (type: string) => {
    const response = await contactTypesReq.deleteContactType(type);
    setContactTypes(contactTypes.filter(contactType => contactType.type !== response.type));
  }

  useEffect(() => {
    getContactTypes();
  }, []);

  return (
    <div className='w-1/3 ml-7'>
      <div className='text-lg border-2 p-4 mt-5 drop-shadow-lg rounded bg-white'>
        <p>{error}</p>
        {loading ? 
          <p> loading Contact Types</p>
          :
          <>
            <CreateContactTypes addNewContactTypeToList={addNewContactTypeToList} />
            <div className="mt-2">
              <h4>Available Contact Types:</h4>
              <ul className="ml-7">
                {contactTypes.map(contactType => 
                  <li key={contactType.type} className='list-disc'>
                    <ContactType type={contactType.type} value_type={contactType.value_type} />
                    <button className='ml-2 border-2 inline rounded px-1 bg-red-500 text-white' onClick={() => deleteContactType(contactType.type)}><i className="fa-regular fa-square-minus"></i></button>
                  </li>
                )}
              </ul>
            </div>
          </>
      }
      </div>
    </div>
  )
}

export default ContactTypesList
