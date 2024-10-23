import React from 'react';

const Dialog = ({ selectedRow, dialogRef, closeDialog }) => {
  return (
    <dialog ref={dialogRef} className="p-6 bg-white rounded-lg shadow-lg">
      {selectedRow && (
        <div>
          <button
            onClick={closeDialog}
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Close
          </button>
          <ul className="list-disc pl-5">
            <li><strong>Customer ID:</strong> {selectedRow.customerIdentificationCode}</li>
            <li><strong>First Name:</strong> {selectedRow.firstName}</li>
            <li><strong>Last Name:</strong> {selectedRow.lastName}</li>
            <li><strong>Birth Date:</strong> {selectedRow.birthDate}</li>
            <li><strong>Gender:</strong> {selectedRow.gender}</li>
          </ul>
        </div>
      )}
    </dialog>
  );
};

export default Dialog;
