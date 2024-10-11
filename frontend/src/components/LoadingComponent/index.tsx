import React from 'react' 
import {RingLoader} from "react-spinners"
import Overlay from '../common/Overlay';
import { useAppSelector } from '../../redux/hooks';
const LoadingComponent:React.FC = () => {
  const { loading } = useAppSelector((state) => state.action);
    return (
        loading&&<Overlay >
          <RingLoader color="#24e8f2" size={80} />
        </Overlay>
      );
}

export default LoadingComponent;