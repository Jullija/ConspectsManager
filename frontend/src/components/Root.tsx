import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { minContentWidth } from '../utils/sizes';

const Root = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          margin: 20,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <div style={{ minWidth: minContentWidth }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
