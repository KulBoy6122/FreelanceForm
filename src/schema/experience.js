export default {
    title: "Work experience",
    fields: [
      {
    
      label: "Work Experience",
      name: "workExperience",
      type: "repeatable",
      fields: [
        { label: "Company Name", name: "company", type: "text", required: true },
        { label: "Role", name: "role", type: "text", required: true },
        { label: "Years", name: "years", type: "number" }
      ]
    }
  ]
  };
  