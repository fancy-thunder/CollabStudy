import React, { useState } from "react";

const AcademicInformation = ({ onNext }) => {
  const [institutionName, setInstitutionName] = useState("");
  const [degreeOrClass, setDegreeOrClass] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleAddSubject = () => {
    if (subjectInput.trim() && !subjects.includes(subjectInput.trim())) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (subject) => {
    setSubjects(subjects.filter(s => s !== subject));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Academic Information
        </h2>
        <form className="space-y-5">
          {/* Institution Name */}
          <div>
            <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-1">
              Institution Name
            </label>
            <input
              type="text"
              id="institutionName"
              name="institutionName"
              placeholder="Your School/College"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
              value={institutionName}
              onChange={e => setInstitutionName(e.target.value)}
              required
            />
          </div>
          {/* Degree or Class */}
          <div>
            <label htmlFor="degreeOrClass" className="block text-sm font-medium text-gray-700 mb-1">
              Degree or Class
            </label>
            <input
              type="text"
              id="degreeOrClass"
              name="degreeOrClass"
              placeholder="B.Tech, 12th Grade, etc."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
              value={degreeOrClass}
              onChange={e => setDegreeOrClass(e.target.value)}
              required
            />
          </div>
          {/* Field of Study */}
          <div>
            <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study
            </label>
            <input
              type="text"
              id="fieldOfStudy"
              name="fieldOfStudy"
              placeholder="Computer Science, Biology, etc."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
              value={fieldOfStudy}
              onChange={e => setFieldOfStudy(e.target.value)}
              required
            />
          </div>
          {/* Academic Year */}
          <div>
            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
              Academic Year
            </label>
            <input
              type="text"
              id="academicYear"
              name="academicYear"
              placeholder="2nd Year / Semester 3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
              value={academicYear}
              onChange={e => setAcademicYear(e.target.value)}
              required
            />
          </div>
          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subjects
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add subject"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-gray-800"
                value={subjectInput}
                onChange={e => setSubjectInput(e.target.value)}
              />
              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={handleAddSubject}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {subjects.map(subject => (
                <span key={subject} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center">
                  {subject}
                  <button
                    type="button"
                    className="ml-2 text-xs text-red-500"
                    onClick={() => handleRemoveSubject(subject)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* Next Button */}
          <button
            type="button"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => onNext && onNext({ institutionName, degreeOrClass, fieldOfStudy, academicYear, subjects })}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default AcademicInformation;
