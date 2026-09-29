export const getStudentListPage = (req, res) => {
  // TODO: Fetch all students
  res.render('students/list', { pageTitle: 'Student List' });
};

export const getAddStudentPage = (req, res) => {
  // TODO: Render add student page
  res.render('students/add', { pageTitle: 'Add Student' });
};

export const createStudent = async (req, res) => {
  // TODO: Validate and save student to database
};

export const getViewStudentPage = async (req, res) => {
  // TODO: Fetch single student details by ID
  res.render('students/view', { pageTitle: 'View Student' });
};

export const getEditStudentPage = async (req, res) => {
  // TODO: Fetch student and render edit form
  res.render('students/edit', { pageTitle: 'Edit Student' });
};

export const updateStudent = async (req, res) => {
  // TODO: Validate and update student details
};

export const deleteStudent = async (req, res) => {
  // TODO: Delete student record
};
