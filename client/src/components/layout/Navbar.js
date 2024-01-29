import { Link,useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import img from '../../img/img logo.webp';
import { logout } from '../../actions/auth';
import { useState } from 'react';
import PostForm from '../posts/PostForm';

const Navbar = ({ auth: { isAuthenticated, loading ,user}, logout }) => {
  const navi = useNavigate();
  const [show, setShow] = useState(false);
  const [post,setPost] = useState(false)

  const authLinks = (
    <div className='naavbar'>
    <button onClick={()=>setPost(true)} className="naavbar_write"><i class="fa fa-pencil" aria-hidden="true"></i>Write</button>
    <Link to='/profiles'>Developers</Link>

   <img src={user?.avatar} className='logo_profile' onClick={()=>setShow(!show)} />
      {
        show && 
        <div
        className="modal-backdrop"
        onClick={() => setShow(false)}>
        <div className='show_logo' onClick={(e)=>e.stopPropagation()}>
            <div className='naavbar profile_main' onClick={()=>{navi('/dashboard');setShow(false)}}>
              <img src={user?.avatar} alt="profile" className="logo_profile_main"/>
              <div className='user_name'>{user?.name}</div>
            </div>
          <Link className="menu_sidebtn" to='/' onClick={() => setShow(false)}>
          <i class="fa-solid fa-code"></i>
            <span className='hide-sm'>Code </span>
          </Link>
          <Link className="menu_sidebtn" to='/' onClick={() => setShow(false)}>
          <i class="fa-solid fa-bookmark"></i>
            <span className='hide-sm'>My Bookmarks </span>
          </Link>
          <Link className="menu_sidebtn" to='/' onClick={() => setShow(false)}>
          <i class="fa-solid fa-bell"></i>
           <span className='hide-sm'>Your Notifications </span>
          </Link>
          <Link className="menu_sidebtn" to='/' onClick={() => setShow(false)}>
          <i class="fa-sharp fa-solid fa-gear"></i>
            <span className='hide-sm'>Account Settings</span>
          </Link>
          <div className="logou_btn" onClick={()=>{logout(); setShow(false)}} >
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span className='hide-sm'>Logout</span>
        </div>

        </div>
        </div>
      }
      {
        post &&
        <div
        className="show_postform"
        onClick={() => setPost(false)}>
          <div className='show_postforminner' onClick={(e)=>e.stopPropagation()}>
            <PostForm close={setPost}/>
          </div>
        </div>
      }
    </div>
  );

  const guestLinks = (
    <>
      <div className='logo_profile' onClick={()=>setShow(!show)}> <img src={img} alt="img"/></div>
          {
            show && 
            <div
          className="modal-backdrop"
          onClick={() => setShow(false)}>
           <div className='show_logo' onClick={(e)=>e.stopPropagation()} style={{padding:'15px'}}>
              <img className="pop_logo" src={img} alt="img"/>
              <div className='log_h'>Sign up or log in to your DevConnect account.</div>
              <div className='log_n'>Takes less than a few seconds.</div>
              <div className='naavbar'>
              <Link className='log_btn btn1' to='/register' onClick={() => setShow(false)}>Register</Link>
              <Link className='log_btn btn2' to='/login' onClick={() => setShow(false)}>Login</Link>
              </ div>
            </div>
          </div>
          }   
        </>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link className='logo' to='/'>
          <i className='fas fa-code-branch' /> DevConnect
        </Link>
      </h1>

      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navbar);
