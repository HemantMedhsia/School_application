import React from "react";
import logo from '../../assets/logo.png';

const StudentAdmitCard = ({ student, exams }) => {
  return (
    <div
      className="max-w-3xl mx-auto p-8 border border-gray-300 shadow-xl bg-white"
      style={{ height: "1123px", width: "794px" }}
    >
      {/* School Header */}
      <div className="text-center mb-8">
        <div className="flex justify-start gap-10 items-center mb-4">
          <img
            src={logo}
            alt="School Logo"
            className="w-20 h-20 mr-4"
          />{" "}
          {/* Replace with actual logo URL */}
          <div>
            <h1 className="text-4xl font-bold text-blue-800">
              Vardhan International School
            </h1>
            <p className="text-sm text-gray-600">
              Plot No. 30, Nibiya Lathiya, Bypass, Varanasi, Uttar Pradesh
              221011
            </p>
            <p className="text-sm text-gray-600">Phone: 123-456-7890</p>
          </div>
        </div>
      </div>

      {/* Admit Card Title */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Admit Card
        </h2>
      </div>

      {/* Student Details Section */}
      <div className="flex justify-between mb-8">
        {/* Left: Student Info */}
        <div>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Name:</span> {student.name}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Roll No:</span> {student.rollNo}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Class:</span> {student.className}
          </p>
        </div>

        {/* Right: Student Photo */}
        <div className="w-24 h-24 border border-gray-300">
          <img
            src={student.photo}
            alt={`${student.name}`}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Exams Table */}
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-200 text-gray-900">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Subject
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Exam Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Start Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                End Time
              </th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={index} className="hover:bg-gray-50 text-gray-700">
                <td className="border border-gray-300 px-4 py-2">
                  {exam.subject}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {exam.examDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {exam.startTime}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {exam.endTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signature Section */}
      <div className="mt-12 flex justify-end">
        <div className="text-center">
          <p className="font-semibold text-gray-700">Signature of Principal</p>
          <p className="mt-4 text-gray-700">_________________________</p>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmitCard;
