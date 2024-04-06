import React,{memo} from 'react'
import { useCurrentRoom } from '../../../context/current-room.context'
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../../../misc/customhooks';
import { ButtonToolbar } from 'rsuite';
import RoomInfoBtnModal from './RoomInfoBtnModal';
const Top = () => {
    const name = useCurrentRoom(value=> value.name);
    const isMobile = useMediaQuery('(max-width: 992px)')
  return (
    <div>
     <div className='d-flex justify-content-between align-items-center'>
       <h4 className='text-disappear d-flex align-items-center'>
        <Link to="/" ><ArrowLeftLineIcon className={ 'd-inline-block p-0 mr-2 text-blue link-unstyled'} /></Link>
        <span className='text-disappear'>{name}</span>
       </h4>
       <ButtonToolbar className='ws-nowrap'>todo</ButtonToolbar>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
            <span>todo</span>
            <RoomInfoBtnModal/>
        </div>
    </div>
  )
}

export default memo(Top);
