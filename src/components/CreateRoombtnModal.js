import React, { useState,useCallback, useRef } from 'react'
import { Button, Modal,Form, Schema } from 'rsuite'
import CreativeIcon from '@rsuite/icons/Creative';
import { useModalState } from '../misc/customhooks';
import { database } from '../misc/firebase';
import { ref,push } from 'firebase/database';
import '../styles/style.css';
//import FormGroup from 'rsuite/esm/FormGroup';
const {StringType} = Schema.Types;
const model=Schema.Model({
    name: StringType().isRequired('Chat name is required'),
    description:StringType().isRequired('Chat description is required')
})

const INITIAL_FORM={
    name:'',
    description:''
}
const CreateRoombtnModal = () => {
    const {isOpen, open, close} = useModalState()
    const [formValue, setFormValue]=useState(INITIAL_FORM);
    const [isLoading,setIsLoading]=useState(false);
    const formRef=useRef();
    const onFormChange=useCallback(value=>{
        setFormValue(value);
    },[]);

    const onSubmit=async()=>{
        if(!formRef.current.check()){
            return;
        }
        setIsLoading(true);

        const newRoomdata={
            ...formValue,
            createdAt:Date.now()
        }
       
            push(ref(database,'rooms'),newRoomdata).then(()=>{
                setIsLoading(false);
                setFormValue(INITIAL_FORM);
                close();
                alert(`${formValue.name} has been created`);
            }
            ).catch((err)=>{
                setIsLoading(false);
            alert(err);
            })
            
            }
        // catch(err){
           
        // }
    
  return (
    <div className='mt-1'>
      <Button block color="green" className="greenbackground" onClick={open}>
        <CreativeIcon/>
        Create new chat room
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
            <Modal.Title>
                New Chat Room
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={formRef}>
        <Form.Group>
            <Form.ControlLabel>Room name

            </Form.ControlLabel>
            <Form.Control name="name" placeholder="Enter chat room name ..."/>

        </Form.Group>

        <Form.Group controlId='textarea'>
            <Form.ControlLabel>description

            </Form.ControlLabel>
            <Form.Control rows={5} name="description" placeholder="Enter room description" />

        </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button block appearance='primary' onClick={onSubmit} disabled={isLoading}>
                Create new chat room
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateRoombtnModal
