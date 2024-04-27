import { Outlet } from 'react-router-dom';

export const Content = ({ containered }: any) => {
  return (
    <div className="content-wrapper" style={{ marginLeft: '0px' }}>
      <section className="content">
        <div className={containered && 'container'}>
          <Outlet />
        </div>
      </section>
    </div>
  );
};