import { Icon } from '@rsuite/icons';
import EditIcon from '@rsuite/icons/Edit';
import CloseIcon from '@rsuite/icons/Close';
import CheckIcon from '@rsuite/icons/Check';
import React,{useState,useCallback} from 'react'
import { Input, InputGroup } from 'rsuite'

const EditableInput = ({initialvalue, onSave,label=null, placeholder="write your value", emptyMsg="Input is empty",...inputprops}) => {
  const [input,setInput]=useState(initialvalue);
  const [isEditable, setIsEditable] = useState(false);
  const onInputChange= useCallback((value)=>{
setInput(value);
  },[]);
  const onEditClick=useCallback(()=>{
    setIsEditable(p => !p);
    setInput(initialvalue);
  },[initialvalue])

  const onSaveClick=async ()=>{
    const trimmed =input.trim();
    if(trimmed===''){
      alert(emptyMsg);
    }
    if(trimmed !== initialvalue){
      await onSave(trimmed);
    }
    setIsEditable(false)
  }
  return (
    <div>
      {label}
      <InputGroup>
      <Input {...inputprops} disabled={!isEditable} placeholder={placeholder} value={input} onChange={onInputChange}/>
   <InputGroup.Button onClick={onEditClick}>
   {isEditable ?<CloseIcon/>: <EditIcon/>}
   
   </InputGroup.Button>
   {isEditable && 
   <InputGroup.Button onClick={onSaveClick}>
   <CheckIcon/>
   
   </InputGroup.Button>
   
   }
   </InputGroup>
    </div>
  )
}

export default EditableInput
