import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => (
  <div className='profile-top bg-primary p-2'>
    <img
      src={avatar}
      alt='Github DP instead of Gravatar'
      className='p-pimg'
    />
    <div className="p-pdottom">
    <h1 className='p-pname'>{name}</h1>

    <p className='p-pstatus'>
      {status}
      {company ? <span> at {company}</span> : null}
    </p>

    <p>{location ? <span className="p-ploc"><i class="fa-solid fa-location-dot"></i>{location}</span> : null}</p>
    
    <div className='p-picon'>
      {website ? (
        <a href={website} target='_blank' rel='noopener noreferrer'>
          <i className='fas fa-globe fa-2x p-icon'></i>
        </a>
      ) : null}

      {social
        ? Object.entries(social)
            .filter(([_, value]) => value)
            .map(([key, value]) => (
              <a
                key={key}
                href={value}
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                <i className={`fab fa-${key} fa-2x p-icon`}></i>
              </a>
            ))
        : null}
    </div>
    </div>
  </div>
);

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
