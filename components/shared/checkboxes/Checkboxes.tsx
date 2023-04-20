"use client"

import Checkbox from './Cneckbox';
import { useState } from 'react';

type CheckboxesProps = {
  isAuthenticated: boolean;
};

const Checkboxes  = ({ isAuthenticated }: CheckboxesProps) => {
  const [showPublicCheckboxes, setShowPublicCheckboxes] = useState(isAuthenticated)
  const [showPrivateCheckboxes, setShowPrivateCheckboxes] = useState(!isAuthenticated)

  const handlePublicCheckboxClick = () => {
    setShowPublicCheckboxes(!showPublicCheckboxes)
    setShowPrivateCheckboxes(false)
  }

  const handlePrivateCheckboxClick = () => {
    setShowPrivateCheckboxes(!showPrivateCheckboxes)
    setShowPublicCheckboxes(false)
  } 

  return (    
    <>
    <div className="grid grid-cols-1 place-items-center">
    <h1 className="text-2xl p-2">CheckLists</h1>
      {isAuthenticated ? (
        <>
          <h2 onClick={handlePrivateCheckboxClick}>Private</h2>
          <div>
              <button onClick={handlePrivateCheckboxClick} className="border border-white bg-transparent px-3 py-0.5 rounded-xl my-2 mx-2">PRIVATE</button>
              <button className="border border-white bg-transparent px-3 py-0.5 rounded-xl my-2 mx-2">MY</button>
              <button className="border border-white bg-transparent px-3 py-0.5 rounded-xl my-2 mx-2">NEW</button>
          </div>
          {showPrivateCheckboxes && (
            <div className="grid grid-cols-1 justify-items-start">
              <Checkbox label="Private Option HTML 1"  />
              <Checkbox label="Private Option CSS 2"  />
              <Checkbox label="Private Option JavaScript 3"   />
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Public</h2>
          <div>
             <button onClick={handlePublicCheckboxClick} className="border border-white bg-transparent px-3 py-0.5 rounded-xl my-2 mx-2">PUBLIC</button>
              <button className="border border-white bg-transparent px-3 py-0.5 rounded-xl my-2 mx-2">MY</button>
              <button className="border border-white bg-transparent px-3 py-0.5 rounded-xl my-2 mx-2">NEW</button>
          </div>
          {showPublicCheckboxes && (
            <div className="grid grid-cols-1 justify-items-start">
              <Checkbox label="Public Option HTML 1"  />
              <Checkbox label="Public Option CSS 2"   />
              <Checkbox label="Private Option JavaScript 3"   />
            </div>
          )}
        </>
      )}
      </div>
    </>
  );
};

export default Checkboxes; 

