import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { contentWidth } from '../utils/sizes';

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
        <div style={{ width: contentWidth }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
