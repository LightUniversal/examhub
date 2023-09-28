import React from "react";
import { FaListAlt, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const PracticeScreen = () => {
  return (
    <div>
      <div className="title mx-5 my-3">
        <h4 className=" flex items-center text-slate-300">
          Courses <FaListAlt className="mx-1" />
        </h4>
      </div>
      <div className="courses border-t border-slate-700">
        <table className=" table text-white  text-center w-full mx-auto table-auto border-separate">
          <thead className=" bg-slate-800 py-3 h-12 px-3">
            <tr>
              <th className=" ">Course-Title</th>
              <th>Level</th>
              <th>Credit-Load</th>
              <th>No. Questions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Inorganic Chemistry</td>
              <td>200 Level</td>
              <td>3 Credit Load</td>
              <td>50</td>
              <td className="mt-2">
              <Link to={"/practicequestions"} className=" bg-slate-950 text-xs text-white flex items-center px-2 py-2 rounded-sm  right-2">practice <FaPencilAlt className=" mx-2" /></Link>
            </td>
            </tr>
            
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  );
};

export default PracticeScreen;
