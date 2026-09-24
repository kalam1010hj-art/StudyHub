import styles from "./Upload.module.css";

import getResoucresfiles from "../../services/resourceServices";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Upload } from "lucide-react";
import { postResoucreFile } from "../../services/resourceServices";
import { getResourceDetails } from "../../services/resourceServices";
function UploadResource() {
  const { userdata } = useContext(AuthContext);
  //  Data of University ,college,degrees etc... are stored in these fields

  let [universitys, setUniversity] = useState([]);
  let [colleges, setColleges] = useState([]);
  let [programs, setPrograms] = useState([]);
  let [branches, setBranches] = useState([]);
  let [semesters, setSemesters] = useState([]);
  let [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    university: "",
    college: "",
    program: "",
    branch: "",
    semester: "",
    subject: "",

    title: "",
    description: "",
    resourceType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  //   Resource form data stored  in this field.
  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    file: null,
    resource_type: "",
    subject: "",
    uploaded_by: "",
  });
  //   filter data based on the ID's
  const filteredColleges = colleges.filter((college) => {
    return college.university === Number(form.university);
  });

  const filteredPrograms = programs.filter((program) => {
    return program.college === Number(form.college);
  });

  const filteredBranches = branches.filter((branch) => {
    return branch.degree === Number(form.program);
  });

  const filteredSemesters = semesters.filter((sem) => {
    return sem.branch === Number(form.branch);
  });

  const filteredSubjects = subjects.filter((subject, index) => {
    return subject.semester == Number(form.semester);
  });

  function HandleChange(event) {
    if (event.target.name == "university") {
      let data = {
        university: event.target.value,
        college: "",
        program: "",
        branch: "",
        semester: "",
        subject: "",

        title: "",
        description: "",
        resourceType: "",
      };
      setForm({ ...data });
    }

    if (event.target.name == "college") {
      let data = {
        university: form.university,
        college: event.target.value,
        program: "",
        branch: "",
        semester: "",
        subject: "",

        title: "",
        description: "",
        resourceType: "",
      };
      setForm({ ...data });
    }

    if (event.target.name == "program") {
      let data = {
        university: form.university,
        college: form.college,
        program: event.target.value,
        branch: "",
        semester: "",
        subject: "",

        title: "",
        description: "",
        resourceType: "",
      };
      setForm({ ...data });
    }

    if (event.target.name == "branch") {
      let data = {
        university: form.university,
        college: form.college,
        program: form.program,
        branch: event.target.value,
        semester: "",
        subject: "",

        title: "",
        description: "",
        resourceType: "",
      };
      setForm({ ...data });
    }

    if (event.target.name == "semester") {
      let data = {
        university: form.university,
        college: form.college,
        program: form.program,
        branch: form.branch,
        semester: event.target.value,
        subject: "",

        title: "",
        description: "",
        resourceType: "",
      };
      setForm({ ...data });
    }

    if (event.target.name == "subject") {
      let data = {
        university: form.university,
        college: form.college,
        program: form.program,
        branch: form.branch,
        semester: form.semester,
        subject: event.target.value,

        title: "",
        description: "",
        resourceType: "",
      };
      setForm({ ...data });
    }
  }

  function HandelResoucreFormChange(event) {
    setResourceForm({
      ...resourceForm,
      [event.target.name]: event.target.value,
    });
  }

  function HandleSubmit() {
    console.log("handle submit started");
   
    if (!form.university) {
      alert("Please select a university");
      return;
    }

    if (!form.college) {
      alert("Please select a college");
      return;
    }

    if (!form.program) {
      alert("Please select a program");
      return;
    }

    if (!form.branch) {
      alert("Please select a branch");
      return;
    }

    if (!form.semester) {
      alert("Please select a semester");
      return;
    }

    if (!form.subject) {
      alert("Please select a subject");
      return;
    }

    if (!resourceForm.title.trim()) {
      alert("Please enter a resource title");
      return;
    }

    if (!resourceForm.description.trim()) {
      alert("Please enter a description");
      return;
    }

    if (!resourceForm.resource_type) {
      alert("Please select a resource type");
      return;
    }

    if (!resourceForm.file) {
      alert("Please select a file");
      return;
    }

    if (!userdata) {
      alert("User information is not available");
      return;
    }
   setIsSubmitting(true);
    const resourceData = {
      title: resourceForm.title.trim(),
      description: resourceForm.description.trim(),
      file: resourceForm.file,
      resource_type: resourceForm.resource_type,
      subject: form.subject,
      uploaded_by: userdata.id,
    };

    postResoucreFile(resourceData)
      .then((response) => {
        console.log("data added sucess fully");
        console.log(response.data);
        setIsSubmitting(false)
        setForm({
          university: "",
          college: "",
          program: "",
          branch: "",
          semester: "",
          subject: "",

          title: "",
          description: "",
          resourceType: "",
        });
        setResourceForm({
          title: "",
          description: "",
          file: null,
          resource_type: "",
          subject: "",
          uploaded_by: "",
        });
      })
      .catch((error) => {
           console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("HEADERS:", error.response?.headers);
        setIsSubmitting(false)
      });
  }
  console.log("Form Data : ", form);
  useEffect(() => {
    getResourceDetails()
      .then((response) => {
        setUniversity(response.data.universities);
        setColleges(response.data.colleges);
        setPrograms(response.data.programs);
        setBranches(response.data.branches);
        setSemesters(response.data.semesters);
        setSubjects(response.data.subjects);
        console.log(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  return (
    <main className={styles.page}>
      {/* =====================================================
        PAGE HEADER
       ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot}></span>
          StudyHub Contributor
        </div>

        <h1>Upload a resource</h1>

        <p>
          Add useful academic resources and organize them for students to
          discover easily.
        </p>
      </section>

      {/* =====================================================
        ACADEMIC PATH
       ===================================================== */}

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <span className={styles.sectionEyebrow}>STEP 01</span>

            <h2>Choose where this resource belongs</h2>

            <p>Select the academic hierarchy from university to subject.</p>
          </div>

          <div className={styles.progressBadge}>
            {form.subject ? "Complete" : "In progress"}
          </div>
        </div>

        <div className={styles.pathGrid}>
          {/* University */}

          <div className={styles.field}>
            <div className={styles.fieldTop}>
              <span className={styles.stepNumber}>01</span>

              <label htmlFor="University">University</label>
            </div>

            <select
              id="University"
              name="university"
              value={form.university}
              onChange={(e) => HandleChange(e)}
            >
              <option value="">Select a university</option>

              {universitys.map((university) => (
                <option key={university.id} value={university.id}>
                  {university.name}
                </option>
              ))}
            </select>

            <span className={styles.helper}>Start with the university</span>
          </div>

          {/* College */}

          <div className={styles.field}>
            <div className={styles.fieldTop}>
              <span className={styles.stepNumber}>02</span>

              <label htmlFor="college">College</label>
            </div>

            <select
              id="college"
              name="college"
              value={form.college}
              disabled={!form.university}
              onChange={(e) => HandleChange(e)}
            >
              <option value="">
                {form.university
                  ? "Select a college"
                  : "Select university first"}
              </option>

              {filteredColleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>

            <span className={styles.helper}>Choose the college</span>
          </div>

          {/* Program */}

          <div className={styles.field}>
            <div className={styles.fieldTop}>
              <span className={styles.stepNumber}>03</span>

              <label htmlFor="programs">Program</label>
            </div>

            <select
              id="programs"
              name="program"
              value={form.program}
              disabled={!form.college}
              onChange={(e) => HandleChange(e)}
            >
              <option value="">
                {form.college ? "Select a program" : "Select college first"}
              </option>

              {filteredPrograms.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>

            <span className={styles.helper}>Example: B.Tech, M.Tech</span>
          </div>

          {/* Branch */}

          <div className={styles.field}>
            <div className={styles.fieldTop}>
              <span className={styles.stepNumber}>04</span>

              <label htmlFor="branch">Branch</label>
            </div>

            <select
              id="branch"
              name="branch"
              value={form.branch}
              disabled={!form.program}
              onChange={(e) => HandleChange(e)}
            >
              <option value="">
                {form.program ? "Select a branch" : "Select program first"}
              </option>

              {filteredBranches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>

            <span className={styles.helper}>Select the specialization</span>
          </div>

          {/* Semester */}

          <div className={styles.field}>
            <div className={styles.fieldTop}>
              <span className={styles.stepNumber}>05</span>

              <label htmlFor="semester">Semester</label>
            </div>

            <select
              id="semester"
              name="semester"
              value={form.semester}
              disabled={!form.branch}
              onChange={(e) => HandleChange(e)}
            >
              <option value="">
                {form.branch ? "Select semester" : "Select branch first"}
              </option>

              {filteredSemesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  Semester {sem.number}
                </option>
              ))}
            </select>

            <span className={styles.helper}>Choose the semester</span>
          </div>

          {/* Subject */}

          <div className={styles.field}>
            <div className={styles.fieldTop}>
              <span className={styles.stepNumber}>06</span>

              <label htmlFor="subject">Subject</label>
            </div>

            <select
              id="subject"
              name="subject"
              value={form.subject}
              disabled={!form.semester}
              onChange={(e) => HandleChange(e)}
            >
              <option value="">
                {form.semester ? "Select a subject" : "Select semester first"}
              </option>

              {filteredSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>

            <span className={styles.helper}>The resource's subject</span>
          </div>
        </div>

        {/* Selected academic path */}

        {(form.university ||
          form.college ||
          form.program ||
          form.branch ||
          form.semester ||
          form.subject) && (
          <div className={styles.selectedPath}>
            <div className={styles.selectedPathHeader}>
              <span className={styles.pathIcon}>✓</span>

              <div>
                <strong>Resource location</strong>

                <span>Your selected academic path</span>
              </div>
            </div>

            <div className={styles.breadcrumbPath}>
              <span>
                {universitys.find((u) => u.id === Number(form.university))
                  ?.name || "University"}
              </span>

              <b>›</b>

              <span>
                {colleges.find((c) => c.id === Number(form.college))?.name ||
                  "College"}
              </span>

              <b>›</b>

              <span>
                {programs.find((p) => p.id === Number(form.program))?.name ||
                  "Program"}
              </span>

              <b>›</b>

              <span>
                {branches.find((b) => b.id === Number(form.branch))?.name ||
                  "Branch"}
              </span>

              <b>›</b>

              <span>
                {form.semester
                  ? `Semester ${
                      semesters.find((s) => s.id === Number(form.semester))
                        ?.number || ""
                    }`
                  : "Semester"}
              </span>

              <b>›</b>

              <span>
                {subjects.find((s) => s.id === Number(form.subject))?.name ||
                  "Subject"}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
        RESOURCE DETAILS
       ===================================================== */}

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <span className={styles.sectionEyebrow}>STEP 02</span>

            <h2>Resource details</h2>

            <p>Tell students what they are about to access.</p>
          </div>
        </div>

        <div className={styles.resourceGrid}>
          {/* Title */}

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="title">Resource title</label>

            <input
              type="text"
              name="title"
              id="title"
              placeholder="e.g. Data Structures — Unit 1 Notes"
              onChange={(e) => HandelResoucreFormChange(e)}
              value={resourceForm.title}
            />

            <span className={styles.helper}>
              Use a clear title students can understand.
            </span>
          </div>

          {/* Description */}

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="description">Description</label>

            <textarea
              name="description"
              id="description"
              placeholder="Briefly describe what this resource contains..."
              onChange={(e) => HandelResoucreFormChange(e)}
              value={resourceForm.description}
            />

            <span className={styles.helper}>
              A short description helps students decide whether the resource is
              useful.
            </span>
          </div>

          {/* Resource type */}

          <div className={styles.field}>
            <label htmlFor="resource_type">Resource type</label>

            <select
              name="resource_type"
              id="resource_type"
              onChange={(e) => HandelResoucreFormChange(e)}
              value={resourceForm.resource_type}
            >
              <option value="">Select resource type</option>

              <option value="notes">Notes</option>

              <option value="question_paper">Question Paper</option>

              <option value="lab_manual">Lab Manual</option>

              <option value="textbook">Textbook</option>

              <option value="syllabus">Syllabus</option>

              <option value="other">Other</option>
            </select>
          </div>

          {/* File */}

          <div className={styles.field}>
            <label htmlFor="resourcefile">Resource file</label>

            <label htmlFor="resourcefile" className={styles.uploadBox}>
              <div className={styles.uploadIcon}>↑</div>

              <div className={styles.uploadContent}>
                {resourceForm.file ? (
                  <>
                    <strong>{resourceForm.file.name}</strong>

                    <span>File selected successfully</span>
                  </>
                ) : (
                  <>
                    <strong>Choose a file</strong>

                    <span>PDF, DOCX, PPTX and other study materials</span>
                  </>
                )}
              </div>

              <span className={styles.browse}>Browse</span>

              <input
                type="file"
                name="file"
                id="resourcefile"
                onChange={(event) => {
                  setResourceForm({
                    ...resourceForm,
                    file: event.target.files[0],
                  });
                }}
              />
            </label>
          </div>
        </div>

        {/* Submit */}

        <div className={styles.submitArea}>
          <div className={styles.submitInfo}>
            <div className={styles.submitCheck}>✓</div>

            <div>
              <strong>Ready to contribute?</strong>

              <span>Your resource will be added to StudyHub.</span>
            </div>
          </div>

        <button
  type="button"
  className={styles.submitButton}
  onClick={HandleSubmit}
  disabled={isSubmitting}
>
  {isSubmitting ? "Uploading..." : "Upload resource"}
  <span>{isSubmitting ? "..." : "→"}</span>
</button>
        </div>
      </section>
    </main>
  );
}
export default UploadResource;
