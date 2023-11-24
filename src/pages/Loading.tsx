import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <div
      style={{
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          clip: 'rect(0, 60px, 120px, 0)',
          background: '#3498db',
          animation: 'left-half-spin 1s linear infinite',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          clip: 'rect(0, 120px, 120px, 60px)',
          background: '#f3f3f3',
          animation: 'right-half-spin 1s linear infinite',
        }}
      ></div>
    </div>
    <p style={{ marginTop: '20px', fontSize: '24px', color: '#555' }}>
      Loading...
    </p>

    <style>
      {`
        @keyframes left-half-spin {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
            background: #f3f3f3;
          }
          100% {
            transform: rotate(360deg);
            background: #3498db;
          }
        }

        @keyframes right-half-spin {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
            background: #3498db;
          }
          100% {
            transform: rotate(360deg);
            background: #f3f3f3;
          }
        }
      `}
    </style>
  </div>
);

export default LoadingSpinner;
