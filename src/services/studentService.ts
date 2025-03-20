const students = [
  {
    academic_register: 121115,
    name: "Frozen Yogurt",
    student_cpf: "123.456.789-00",
  },
  {
    academic_register: 101234,
    name: "Ice Cream Sandwich",
    student_cpf: "987.654.321-00",
  },
];

export const getStudentById = async (academic_register: number) => {
  return (
    students.find(
      (student) => student.academic_register === academic_register
    ) || null
  );
};
