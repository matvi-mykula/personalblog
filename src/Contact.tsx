import React from 'react';

const Contact: React.FC = () => {
  return (
    <div>
      <p>::Contact Me::</p>
      <p>
        Send me an email at ...{' '}
        <a href="matt.pronchick@gmail.com?subject=Blog%20Inquiry">
          matt.pronchick@gmail.com
        </a>
      </p>
    </div>
  );
};

export { Contact };
