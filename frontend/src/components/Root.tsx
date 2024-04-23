import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { contentWidth } from '../utils/sizes';
import { axiosClient } from '../api/axiosClient';
import getToken from '../utils/tokenManager';
const Root = () => {
  axiosClient.defaults.headers.common['Authorization'] = `Token ${getToken()}`;

  return (
    <>
      <Navbar />
      <div
        style={{
          margin: 20,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <div style={{ width: contentWidth }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
