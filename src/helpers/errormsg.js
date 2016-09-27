import React from 'react';

export default function errorMsg(msg) {
  if (msg) {
    return (
      <div className="alert alert-danger">
        {msg}
      </div>
    );
  }
}
