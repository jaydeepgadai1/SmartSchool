
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "schooldb"
});

db.connect((err) => {
  if (err) {
    console.error('MySQL Connection Error:', err);
  } else {
    console.log('MySQL Connected!');
  }
});

app.get('/Topcollege', (req, res) => {
  const query = 'SELECT * FROM topcollegename';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'Error fetching data from the database', details: err.message });
    } else {
      res.json(result);
    }
  });
});

app.get('/Collegedetails', (req, res) => { 
  const keyword = req.query.name;
  const query = `SELECT * FROM topcollegename INNER JOIN topcollege ON topcollegename.collegefeild= topcollege.name WHERE topcollege.name = ?`;
  db.query(query, [keyword], (err, result) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'Error fetching data from the database', details: err.message });
    } else {
      res.json(result);
    }
  });
});

/*app.get('/Collegedetails', (req, res) => { 
  const keyword = req.query.collegefield;
  const query = `SELECT * FROM topcollege INNER JOIN collegedetails ON collegedetails.collegefeild= topcollege.name WHERE topcollege.name = ?`;
  db.query(query, [keyword], (err, result) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'Error fetching data from the database', details: err.message });
    } else {
      res.json(result);
    }
  });
});*/
app.get('/Course', (req, res) => {
  const keyword = req.query.institute;

  const query = `SELECT * FROM topcollegename where institute= ?`;
  db.query(query, [keyword], (err, result) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'Error fetching data from the database', details: err.message });
    } else {
      res.json(result);
    }
  });
});

app.get('/Collegeportal', (req, res) => { 
  const keyword = req.query.institute;
  const query = `SELECT * FROM topcollegename where institute=?`;
  db.query(query, [keyword], (err, result) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'Error fetching data from the database', details: err.message });
    } else {
      res.json(result);
    }
  });
});


app.get('/ApplicantForm', (req, res) => { 
  const keyword = req.query.collegename;
  const query = `SELECT * FROM topcollegename where institute=?`;
  db.query(query, [keyword], (err, result) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'Error fetching data from the database', details: err.message });
    } else {
      res.json(result);
    }
  });
});

app.post('/', (req, res) => {
  const { id, pname, descr } = req.body;

  // SQL query to insert data into the 'practice' table
  const sql = `INSERT INTO practice (id, pname, descr) VALUES (?, ?, ?)`;
  const values = [id, pname, descr];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Data inserted into practice table:', result);
    res.json({ success: true, message: 'Data inserted successfully' });
  });
});
app.post('/ApplicantForm', (req, res) => {
  const {
 
    first_name,
    middle_name,
    last_name,
    gender,
    dob,
    email,
    parent_guardian_name,
    parent_occupation,
    street_address,
    city,
    state,
    country,
    zip_code,
    student_phone,
    guardian_phone,
    qualification_10_school,
    qualification_10_year,
    qualification_10_percentage,
    qualification_12_school,
    qualification_12_year,
    qualification_12_percentage
  } = req.body;

  const sql = `
    INSERT INTO applicants (
       first_name, middle_name, last_name, gender, 
      dob,email, parent_guardian_name, parent_occupation, street_address, 
      city, state, country, zip_code, student_phone, guardian_phone, 
      qualification_10_school, qualification_10_year, qualification_10_percentage, 
      qualification_12_school, qualification_12_year, qualification_12_percentage
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [
  
    first_name,
    middle_name,
    last_name,
    gender,
    dob,
    email,
    parent_guardian_name,
    parent_occupation,
    street_address,
    city,
    state,
    country,
    zip_code,
    student_phone,
    guardian_phone,
    qualification_10_school,
    qualification_10_year,
    qualification_10_percentage,
    qualification_12_school,
    qualification_12_year,
    qualification_12_percentage
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Data inserted into applicants table:', result);
    res.json({ success: true, message: 'Data inserted successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
