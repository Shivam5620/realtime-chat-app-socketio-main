import React from 'react';

export const GenderCheckBox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className='flex gap-4'>
      <label>
        Male
        <input type='checkbox' checked={selectedGender === 'male'} onChange={() => onCheckboxChange('male')} />
      </label>
      <label>
        Female
        <input type='checkbox' checked={selectedGender === 'female'} onChange={() => onCheckboxChange('female')} />
      </label>
    </div>
  );
};