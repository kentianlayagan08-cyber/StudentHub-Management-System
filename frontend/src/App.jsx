import { useMemo, useState } from 'react';

const initialStudents = [
  {
    id: 1,
    firstName: 'Alicia',
    lastName: 'Reyes',
    middleName: 'D.',
    email: 'alicia@studenthub.edu',
    password: 'student123',
    course: 'Computer Science',
    yearLevel: '3rd Year'
  },
  {
    id: 2,
    firstName: 'James',
    lastName: 'Cruz',
    middleName: 'V.',
    email: 'james@studenthub.edu',
    password: 'student456',
    course: 'Business Administration',
    yearLevel: '2nd Year'
  }
];

const emptyForm = {
  id: '',
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  password: '',
  course: '',
  yearLevel: ''
};

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [search, setSearch] = useState('');

  const totalStudents = students.length;
  const totalCourses = new Set(students.map((student) => student.course)).size;
  const totalYears = new Set(students.map((student) => student.yearLevel)).size;

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = search.toLowerCase();
      return (
        student.firstName.toLowerCase().includes(query) ||
        student.lastName.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query)
      );
    });
  }, [students, search]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!loginInfo.email || !loginInfo.password) {
      alert('Please enter your student email and password.');
      return;
    }

    const match = students.find(
      (student) =>
        student.email.toLowerCase() === loginInfo.email.toLowerCase() &&
        student.password === loginInfo.password
    );

    if (!match) {
      alert('Invalid student email or password.');
      return;
    }

    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLoginInfo({ email: '', password: '' });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      form.firstName,
      form.lastName,
      form.email,
      form.course,
      form.yearLevel,
      form.password
    ];

    if (requiredFields.some((field) => !field || !field.trim())) {
      alert('Please complete all required fields.');
      return;
    }

    if (isEditing) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === form.id
            ? { ...student, ...form }
            : student
        )
      );
    } else {
      const newStudent = {
        ...form,
        id: Date.now(),
        middleName: form.middleName || '-'
      };
      setStudents((prev) => [newStudent, ...prev]);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm(emptyForm);
    setIsEditing(false);
  };

  const handleEdit = (student) => {
    setForm({ ...student });
    setIsEditing(true);
  };

  const handleDelete = (studentId) => {
    setStudents((prev) => prev.filter((student) => student.id !== studentId));
  };

  return (
    <div className="app-shell">
      {!loggedIn ? (
        <div className="login-screen fade-in">
          <div className="brand-panel">
            <div className="brand-icon">S</div>
            <h1>StudentHub</h1>
            <p>Professional student portal and management system.</p>
            <ul>
              <li>Student login access</li>
              <li>Profile and enrollment tracking</li>
              <li>Clean dashboard with analytics</li>
            </ul>
          </div>

          <form className="login-card" onSubmit={handleLogin}>
            <span className="eyebrow">Welcome back</span>
            <h2>Student Login</h2>

            <label>
              Email Address
              <input
                type="email"
                value={loginInfo.email}
                onChange={(event) =>
                  setLoginInfo((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="student@school.edu"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={loginInfo.password}
                onChange={(event) =>
                  setLoginInfo((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="Enter password"
              />
            </label>

            <button type="submit" className="btn btn-primary btn-block">
              Log In
            </button>

            <button type="button" className="btn btn-secondary btn-block">
              Create Account
            </button>
          </form>
        </div>
      ) : (
        <div className="dashboard-shell fade-in">
          <aside className="sidebar">
            <div className="brand-wrap">
              <div className="brand-icon">S</div>
              <div>
                <h3>StudentHub</h3>
                <span>Admin Portal</span>
              </div>
            </div>

            <nav className="nav-menu">
              <button className="nav-item active">Dashboard</button>
              <button className="nav-item">Students</button>
              <button className="nav-item">Enrollments</button>
              <button className="nav-item">Reports</button>
              <button className="nav-item">Settings</button>
            </nav>

            <button className="btn btn-logout" onClick={handleLogout}>
              Log Out
            </button>
          </aside>

          <main className="content-area">
            <header className="topbar">
              <div>
                <p className="eyebrow">Overview</p>
                <h1>Student Management</h1>
              </div>
              <div className="top-actions">
                <button className="btn btn-primary">+ Add Student</button>
                <button className="btn btn-secondary">Export</button>
              </div>
            </header>

            <section className="stat-grid">
              <article className="stat-card accent-blue">
                <span>Total Students</span>
                <strong>{totalStudents}</strong>
              </article>
              <article className="stat-card accent-green">
                <span>Active Courses</span>
                <strong>{totalCourses}</strong>
              </article>
              <article className="stat-card accent-purple">
                <span>Year Levels</span>
                <strong>{totalYears}</strong>
              </article>
            </section>

            <section className="panel form-panel">
              <div className="panel-header">
                <h2>{isEditing ? 'Edit Student Details' : 'Add New Student'}</h2>
              </div>

              <form className="student-form" onSubmit={handleSubmit}>
                <div className="field-grid">
                  <label>
                    First Name
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleFormChange}
                      placeholder="First name"
                    />
                  </label>

                  <label>
                    Last Name
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleFormChange}
                      placeholder="Last name"
                    />
                  </label>

                  <label>
                    Middle Name
                    <input
                      name="middleName"
                      value={form.middleName}
                      onChange={handleFormChange}
                      placeholder="Middle name"
                    />
                  </label>

                  <label>
                    Email
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="name@email.com"
                    />
                  </label>

                  <label>
                    Password
                    <input
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleFormChange}
                      placeholder="Secure password"
                    />
                  </label>

                  <label>
                    Course
                    <input
                      name="course"
                      value={form.course}
                      onChange={handleFormChange}
                      placeholder="Course"
                    />
                  </label>

                  <label>
                    Year Level
                    <input
                      name="yearLevel"
                      value={form.yearLevel}
                      onChange={handleFormChange}
                      placeholder="1st Year"
                    />
                  </label>
                </div>

                <div className="button-row">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update Student' : 'Save Student'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Reset
                  </button>
                </div>
              </form>
            </section>

            <section className="panel table-panel">
              <div className="panel-header table-header">
                <h2>Student Records</h2>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search students"
                />
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Year</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="empty-state">
                          No student records found.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student, index) => (
                        <tr key={student.id}>
                          <td>{index + 1}</td>
                          <td>
                            {student.firstName} {student.middleName} {student.lastName}
                          </td>
                          <td>{student.course}</td>
                          <td>{student.yearLevel}</td>
                          <td>{student.email}</td>
                          <td>
                            <div className="row-actions">
                              <button
                                className="mini-btn edit-btn"
                                onClick={() => handleEdit(student)}
                              >
                                Edit
                              </button>
                              <button
                                className="mini-btn delete-btn"
                                onClick={() => handleDelete(student.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
