/* eslint-disable react/prop-types */
// import React from 'react'

function CustomAlert({ show, message, onCancel, onConfirm, documentId }) {
  return (
    <div className={`border-2 p-5 ${show?"":"hidden"} place-items-center max-w-80 fixed bg-white top-1/3 left-1/3 shadow-sm rounded-lg`}>
      <h4 className="text-xl text-center">{message}</h4>
      <div className="flex w-full justify-center">
        <button className="bg-blue-500 cursor-pointer border border-blue-500 text-white mx-2 px-4 py-2 rounded-xl" onClick={onCancel}>Cancel</button>
        <button className="bg-red-500 cursor-pointer border border-red-500 text-white mx-2 px-4 py-2 rounded-xl" onClick={()=>onConfirm(documentId)}>Delete</button>
    </div>
  </div>
  );
}

export default CustomAlert;
