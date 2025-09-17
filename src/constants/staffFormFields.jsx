import { useData } from "../context/appContext";
import { formatLgaDataToSelectOptions } from "../utilities/formatLgaDataToSelectOptions";

export function StaffFormFields() {
  const { data } = useData();

  const lgaOptions = formatLgaDataToSelectOptions(data);

  // staffFormFields.js
  const staffFormFields = [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "staffId", label: "Staff ID", type: "text" },
    { name: "dob", label: "Date of Birth", type: "date" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    { name: "schoolName", label: "School Name", type: "text" },
    { name: "phoneNumber", label: "Phone Number", type: "tel" },
    {
      name: "schoolCategory",
      label: "School Category",
      type: "select",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
      ],
    },
    {
      name: "staffCategory",
      label: "Staff Category",
      type: "select",
      options: [
        { label: "Teaching Staff", value: "teachingStaff" },
        { label: "Non Teaching Staff", value: "nonTeachingStaff" },
      ],
    },
    { name: "state", label: "State", type: "text" },
    {
      name: "lga",
      label: "Local Government Area",
      type: "select",
      options: lgaOptions,
    },
    { name: "nin", label: "NIN", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "address", label: "Address", type: "text" },
    {
      name: "maritalStatus",
      label: "Marital Status",
      type: "select",
      options: [
        { label: "Single", value: "single" },
        { label: "Married", value: "married" },
      ],
    },
    { name: "employer", label: "Employer", type: "text" },
    {
      name: "employmentType",
      label: "Type Of Employment",
      type: "select",
      options: [
        { label: "Permanent", value: "permanent" },
        { label: "Temprorary", value: "temprorary" },
      ],
    },
    { name: "appointmentDate", label: "Appointment Date", type: "date" },
    {
      name: "dateLastAppointment",
      label: "Date Of Last Appointment (Optional)",
      type: "lastAppointment",
    },
    { name: "lastPromotion", label: "Last Promotion Date", type: "date" },
    {
      name: "lastGradeLevel",
      label: "Grade Level At First Appointment",
      type: "text",
    },
    { name: "presentGradeLevel", label: "Present Grade Level", type: "text" },
    {
      name: "computerLiteracy",
      label: "Computer Literacy",
      type: "select",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "staffTraining",
      label: "Staff Training",
      type: "select",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "highestAcademicQaulification",
      label: "Highest Academic Qualification",
      type: "text",
    },
    {
      name: "subjectArea",
      label: "Subject Area And Specialization",
      type: "text",
    },
    { name: "documentSighted", label: "Document Sighted", type: "textarea" },
    { name: "avatar", label: "Avatar", type: "file" },
    {
      name: "capturedBy",
      label: "Captured By",
      type: "select",
      options: [
        { label: "Jude", value: "jude" },
        { label: "Laha", value: "laha" },
        { label: "Jumoke", value: "jumoke" },
        { label: "Sodiq", value: "sodiq" },
        { label: "Abdul", value: "abdul" },
        { label: "Isaiah", value: "isaiah" },
        { label: "Michael Ogaga", value: "ogaga" },
        { label: "Yachiga", value: "yachiga" },
      ],
    },
    // Add more fields for employer, marital status, etc.
  ];

  return <div>{staffFormFields}</div>;
}
