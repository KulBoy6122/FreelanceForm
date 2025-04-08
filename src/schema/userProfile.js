export default {
    title: "User Profile Form",
    fields: [
      { label: "Full Name", name: "fullName", type: "text", required: true },
      { label: "Gender", name: "gender", type: "radio", options: ["Male", "Female", "Other"], required: true },
      { label: "Country", name: "country", type: "select", options: ["USA", "India", "Germany"], required: true },
      { label: "Subscribe to Newsletter", name: "newsletter", type: "checkbox" },
     
    ]
  };