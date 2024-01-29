import PropTypes from 'prop-types';
import { Link,useParams,useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { useState,useEffect } from 'react';
import { addLike, removeLike, deletePost } from '../../actions/post';
import formatDate from '../../utils/formatDate';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id,title,text,readtime, name, avatar, user, likes,dislikes, comments, date },
  showActions,
}) => {

  const {id}=useParams();
  const navigate=useNavigate();
  const [read,setRead] = useState(false);

    useEffect(()=>{
    if(id){
      setRead(true);
    }}
    ,[])

  return(
  <div className='post bg-white my-1 p-1'>
        <Link to={`/profile/${user}`} className='post_head'>
          <img
            src={avatar}
            alt='Github DP instead of Gravatar'
            className='post_avatar'
          />
        <div className='post_det'>
        <h4 className='post_pname'>{name}</h4>
        <p className='post-date'>{formatDate(date)}</p>
        </div>
      </Link>

    <div className='post_middle'>
      <div className='post_middlehead'>{title}</div>
      <div className='post_middlehead2'><i class="fa-solid fa-book-open"/>{readtime} min read</div>
      <p className='post_middletextmain'>{text.length < 400 || read ? text : 
      <> {text.substring(0,400)}<button className='post_readmore' onClick={()=>navigate(`/posts/${_id}`)}>...  Read More</button></> }
      </p>
    </div>

    <div className='post_bottom'>
      {showActions && (
        <>
          <button
            onClick={(e) => addLike(_id)}
            type='button'
            className='btn-like'
          >
            <i className='fas fa-thumbs-up' style={{color:`${likes.some(a=>a.user === auth.user._id) ? '#2190ff' : 'white' }`}}/>
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          
          </button>
          <button
            onClick={(e) => removeLike(_id)}
            type='button'
            className='btn-like'
          >
            <i className='fas fa-thumbs-down' style={{color:`${dislikes.some(a=>a.user === auth.user._id) ? '#2190ff' : 'white' }`}}/>
            <span>{dislikes.length > 0 && <span>{dislikes.length}</span>}</span>
          </button>

          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
            Discussion
          </Link>

          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
             <i class="fa-solid fa-trash"></i>
            </button>
          )}
        </>
      )}
    </div>
  </div>
);
}

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
