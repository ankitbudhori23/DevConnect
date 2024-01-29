import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    company,
    status,
    location,
    skills,
    bio
  },
}) => {
  const navigate = useNavigate();
  return (
    <div className='profile bg-light' onClick={()=>navigate(`/profile/${_id}`)}>
      <img
        src={avatar}
        alt='Github DP instead of Gravatar'
        className='profile-img'
      />

        <div className='profile-left'>
          <h2 className='profile-named'>{name}</h2>

          <p className='profile-status'>
            {status} {company && <span> at {company}</span>}
          </p>
            <div className='profile-bio'>{bio}</div>
            <p className='profile-loc'><i class="fa-solid fa-location-dot"></i>{location && <span>{location}</span>}</p>
                  
        </div>

     
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
