export default {
  title: "Education",
  fields: [
    {
      label: "Education History",
      name: "education",
      type: "repeatable",
      fields: [
        { label: "Institution", name: "institution", type: "text", required: true },
        { label: "Degree", name: "degree", type: "text", required: true },
        { label: "Field of Study", name: "field", type: "text" },
        { label: "Start Year", name: "startYear", type: "number" },
        { label: "End Year", name: "endYear", type: "number" }
      ]
    }
  ]
};