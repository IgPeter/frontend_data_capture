export const learnersFormFields = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "schoolName", label: "School Name", type: "text" },
  { name: "class", label: "Class", type: "text" },
  { name: "age", label: "Age", type: "text" },
  { name: "dateOfBirth", label: "Date Of Birth", type: "date" },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  { name: "lga", label: "Local Government Origin", type: "text" },
  { name: "nin", label: "NIN (Optional)", type: "NIN" },
  { name: "address", label: "Address", type: "text" },
  { name: "parent", label: "Parent's Name", type: "text" },
  { name: "arm", label: "Arm/Stream", type: "text" },
  { name: "yearAdmitted", label: "Year Admitted", type: "text" },
  {
    name: "hasDisability",
    label: "Disabillity",
    type: "select",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  { name: "avatar", label: "Avatar", type: "file" },
];
