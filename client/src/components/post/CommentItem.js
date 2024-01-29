import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteComment } from '../../actions/post';
import formatDate from '../../utils/formatDate';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => (
  <div class='post bg-white p-1 my-1'>
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
      <p  className='post_middletext'>{text}</p>
    </div>

    
      {!auth.loading && user === auth.user._id && (
        <div className='post_bottom'>
            <button
              onClick={(e) => deleteComment(postId, _id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
            </div>
          )}
      
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { deleteComment })(CommentItem);
