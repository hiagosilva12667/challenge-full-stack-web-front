const students = [
  { academicRegister: 121115, name: "Frozen Yogurt", cpf: "123.456.789-00" },
  {
    academicRegister: 101234,
    name: "Ice Cream Sandwich",
    cpf: "987.654.321-00",
  },
];

export const getStudentById = async (academicRegister: number) => {
  return (
    students.find((student) => student.academicRegister === academicRegister) ||
    null
  );
};
