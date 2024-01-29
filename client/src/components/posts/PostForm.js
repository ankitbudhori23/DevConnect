import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost,close }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addPost({ title,text });
    setTitle('');
    setText('');
    close(false);
  };
  return (
    <div className='post-form'>
      <div className='post-form-header'>
        <h3>Write Something...</h3>
      </div>

      <form className='form my-1' onSubmit={handleOnSubmit}>
        <input type="text"
        className='post-form-title'
        value={title}
        placeholder="Title of Post"
        onChange={(e)=>setTitle(e.target.value)}
        required       />
        <textarea
          name='text'
          cols='30'
          rows='10'
          placeholder='Description of post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
