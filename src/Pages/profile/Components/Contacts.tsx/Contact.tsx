import {useEffect, useState} from 'react'

import ContactRequest from '../../../../utils/Requests/Contacts/Contacts.Requests';
import CreateContact from './CreateContact';
import { contactOBJ } from '../../../../utils/Requests/Contacts/Contacts.Requests.Object';
import { useSelector } from 'react-redux';
import { EmployeeOBJ } from '../../../../utils/Requests/Employees/Employees.Requests.Objects';

type Props = {
    employeeID: number,
    isProfileOwner?: boolean
}

const defaultContactsData: contactOBJ[] = [];

function Contact({employeeID, isProfileOwner = false}: Props) {

    const contactReq = new ContactRequest();

    const currentUserData: EmployeeOBJ = useSelector(state => (state as any).CurrentSessionUserData);
    const [contactsData, setContactData] = useState(defaultContactsData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getContacts = async () => {
        const response = await contactReq.getEmployeeContacts(employeeID);
        setContactData(response);
        setLoading(false);
    }

    const deleteContact = async (id: number) => {
      const response = await contactReq.deleteContact(id);
      if(response.error){
        return setError(response.message);
      }
      setContactData(contactsData.filter(contact => contact.id !== id));
    }

    const addNewContactData = (contact: contactOBJ) => {
      setContactData([...contactsData, contact]);
    }

    useEffect(() => {
        getContacts();
    }, [isProfileOwner]);

  return (
    <div className='text-lg border-2 p-4 mt-5 drop-shadow-lg rounded bg-white'>
      <h3 className='mb-5'>Contacts:</h3>
      <p>{error}</p>
      {loading ? 
        <h3>Loading</h3>
        :
        <div className=''>
          <ul className='ml-4'>
            {contactsData.map((contact, i) => 
              <li key={i} className='mb-3 flex'>
                <span className=''>{contact.contact_type_id}: <span className=''>{contact.value}</span></span>
                {currentUserData.id === employeeID ?                  
                  <div className='flex w-60 justify-end'>
                    <button className='ml-2 border-2 inline rounded px-1 bg-red-500 text-white h-9' onClick={() => deleteContact(contact.id)}><i className="fa-regular fa-square-minus"></i></button>
                  </div>
                : 
                ""}
              </li>
            )}
          </ul>
          {
            isProfileOwner ?
              <CreateContact addNewContactData={addNewContactData} />
            : ""
          }
        </div>
      }
    </div>
  )
}

export default Contact;
