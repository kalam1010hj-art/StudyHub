import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  Check,
  ChevronDown,
  GraduationCap,
  Layers3,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import styles from "./AcademicManagement.module.css";
import getProfile from "../../services/UserServices";
import {
  createBranch,
  createSemester,
  createSubject,
  deleteBranch,
  deleteSemester,
  deleteSubject,
  getAcademicDirectory,
  updateBranch,
  updateSemester,
  updateSubject,
} from "../../services/academicManagementService";

const EMPTY_BRANCH = {
  name: "",
  code: "",
  degree: "",
  degree_code: "",
  short_name: "",
  description: "",
  duration_years: 4,
  is_active: true,
};

const EMPTY_SEMESTER = {
  branch: "",
  number: 1,
};

const EMPTY_SUBJECT = {
  semester: "",
  name: "",
  code: "",
};

const getErrorMessage = (error, fallback) => {
  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) return data;
  if (data?.detail) return data.detail;
  if (data?.error) return data.error;

  if (data && typeof data === "object") {
    const first = Object.values(data)
      .flat(Infinity)
      .find((value) => typeof value === "string" && value.trim());

    if (first) return first;
  }

  return error?.message || fallback;
};

const AcademicManagement = () => {
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const [activeTab, setActiveTab] = useState("branches");

  const [degrees, setDegrees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState("");

  const [branchForm, setBranchForm] = useState(EMPTY_BRANCH);
  const [semesterForm, setSemesterForm] = useState(EMPTY_SEMESTER);
  const [subjectForm, setSubjectForm] = useState(EMPTY_SUBJECT);

  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingKey, setDeletingKey] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    let mounted = true;

    const checkAccess = async () => {
      try {
        const response = await getProfile();
        if (!mounted) return;

        setIsStaff(Boolean(response.data?.is_staff));
      } catch (error) {
        if (!mounted) return;
        setIsStaff(false);
      } finally {
        if (mounted) setIsCheckingAccess(false);
      }
    };

    checkAccess();

    return () => {
      mounted = false;
    };
  }, []);

  const loadAcademicData = async () => {
    setLoadingData(true);
    setDataError("");

    try {
      const response = await getAcademicDirectory();
      const data = response.data || {};

      setDegrees(Array.isArray(data.programs) ? data.programs : []);
      setBranches(Array.isArray(data.branches) ? data.branches : []);
      setSemesters(Array.isArray(data.semesters) ? data.semesters : []);
      setSubjects(Array.isArray(data.subjects) ? data.subjects : []);
    } catch (error) {
      setDataError(
        getErrorMessage(
          error,
          "Unable to load academic structure. Please try again."
        )
      );
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isStaff) {
      loadAcademicData();
    }
  }, [isStaff]);

  const degreeMap = useMemo(
    () => new Map(degrees.map((degree) => [degree.id, degree])),
    [degrees]
  );

  const branchMap = useMemo(
    () => new Map(branches.map((branch) => [branch.id, branch])),
    [branches]
  );

  const semesterMap = useMemo(
    () => new Map(semesters.map((semester) => [semester.id, semester])),
    [semesters]
  );

  const resetForms = () => {
    setEditingId(null);
    setBranchForm(EMPTY_BRANCH);
    setSemesterForm(EMPTY_SEMESTER);
    setSubjectForm(EMPTY_SUBJECT);
    setStatus({ type: "", message: "" });
  };

  const showStatus = (type, message) => {
    setStatus({ type, message });
  };

  const handleBranchSubmit = async (event) => {
    event.preventDefault();
    if (!branchForm.name.trim() || !branchForm.code.trim() || !branchForm.degree) {
      showStatus("error", "Branch name, code, and degree are required.");
      return;
    }

    setSaving(true);
    setStatus({ type: "", message: "" });

    const payload = {
      ...branchForm,
      name: branchForm.name.trim(),
      code: branchForm.code.trim(),
      degree_code: branchForm.degree_code.trim(),
      short_name: branchForm.short_name.trim(),
      description: branchForm.description.trim(),
      duration_years: Number(branchForm.duration_years) || 4,
      degree: Number(branchForm.degree),
    };

    try {
      const response = editingId
        ? await updateBranch(editingId, payload)
        : await createBranch(payload);

      if (editingId) {
        setBranches((current) =>
          current.map((item) => (item.id === editingId ? response.data : item))
        );
        showStatus("success", "Branch updated successfully.");
      } else {
        setBranches((current) => [response.data, ...current]);
        showStatus("success", "Branch added successfully.");
      }

      setBranchForm(EMPTY_BRANCH);
      setEditingId(null);
    } catch (error) {
      showStatus(
        "error",
        getErrorMessage(error, "Unable to save the branch.")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSemesterSubmit = async (event) => {
    event.preventDefault();
    if (!semesterForm.branch || !semesterForm.number) {
      showStatus("error", "Branch and semester number are required.");
      return;
    }

    setSaving(true);
    setStatus({ type: "", message: "" });

    const payload = {
      branch: Number(semesterForm.branch),
      number: Number(semesterForm.number),
    };

    try {
      const response = editingId
        ? await updateSemester(editingId, payload)
        : await createSemester(payload);

      if (editingId) {
        setSemesters((current) =>
          current.map((item) => (item.id === editingId ? response.data : item))
        );
        showStatus("success", "Semester updated successfully.");
      } else {
        setSemesters((current) => [response.data, ...current]);
        showStatus("success", "Semester added successfully.");
      }

      setSemesterForm(EMPTY_SEMESTER);
      setEditingId(null);
    } catch (error) {
      showStatus(
        "error",
        getErrorMessage(error, "Unable to save the semester.")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSubjectSubmit = async (event) => {
    event.preventDefault();
    if (!subjectForm.semester || !subjectForm.name.trim() || !subjectForm.code.trim()) {
      showStatus("error", "Semester, subject name, and subject code are required.");
      return;
    }

    setSaving(true);
    setStatus({ type: "", message: "" });

    const payload = {
      semester: Number(subjectForm.semester),
      name: subjectForm.name.trim(),
      code: subjectForm.code.trim(),
    };

    try {
      const response = editingId
        ? await updateSubject(editingId, payload)
        : await createSubject(payload);

      if (editingId) {
        setSubjects((current) =>
          current.map((item) => (item.id === editingId ? response.data : item))
        );
        showStatus("success", "Subject updated successfully.");
      } else {
        setSubjects((current) => [response.data, ...current]);
        showStatus("success", "Subject added successfully.");
      }

      setSubjectForm(EMPTY_SUBJECT);
      setEditingId(null);
    } catch (error) {
      showStatus(
        "error",
        getErrorMessage(error, "Unable to save the subject.")
      );
    } finally {
      setSaving(false);
    }
  };

  const startEditBranch = (branch) => {
    setActiveTab("branches");
    setEditingId(branch.id);
    setBranchForm({
      name: branch.name || "",
      code: branch.code || "",
      degree: branch.degree || "",
      degree_code: branch.degree_code || "",
      short_name: branch.short_name || "",
      description: branch.description || "",
      duration_years: branch.duration_years || 4,
      is_active: branch.is_active ?? true,
    });
    setStatus({ type: "", message: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEditSemester = (semester) => {
    setActiveTab("semesters");
    setEditingId(semester.id);
    setSemesterForm({
      branch: semester.branch || "",
      number: semester.number || 1,
    });
    setStatus({ type: "", message: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEditSubject = (subject) => {
    setActiveTab("subjects");
    setEditingId(subject.id);
    setSubjectForm({
      semester: subject.semester || "",
      name: subject.name || "",
      code: subject.code || "",
    });
    setStatus({ type: "", message: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeItem = async (type, id, label) => {
    const confirmed = window.confirm(
      `Delete ${label}? This cannot be undone.`
    );

    if (!confirmed) return;

    const key = `${type}-${id}`;
    setDeletingKey(key);
    setStatus({ type: "", message: "" });

    try {
      if (type === "branch") {
        await deleteBranch(id);
        setBranches((current) => current.filter((item) => item.id !== id));
      }

      if (type === "semester") {
        await deleteSemester(id);
        setSemesters((current) => current.filter((item) => item.id !== id));
      }

      if (type === "subject") {
        await deleteSubject(id);
        setSubjects((current) => current.filter((item) => item.id !== id));
      }

      showStatus("success", `${label} deleted successfully.`);
      if (editingId === id) resetForms();
    } catch (error) {
      showStatus(
        "error",
        getErrorMessage(error, `Unable to delete ${label.toLowerCase()}.`)
      );
    } finally {
      setDeletingKey("");
    }
  };

  const renderStatus = () => {
    if (!status.message) return null;

    return (
      <div
        className={status.type === "success" ? styles.success : styles.error}
        role={status.type === "error" ? "alert" : "status"}
      >
        {status.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
        <span>{status.message}</span>
        <button
          type="button"
          className={styles.dismiss}
          onClick={() => setStatus({ type: "", message: "" })}
          aria-label="Dismiss message"
        >
          <X size={16} />
        </button>
      </div>
    );
  };

  if (isCheckingAccess) {
    return (
      <main className={styles.page}>
        <div className={styles.centerState}>
          <Loader2 className={styles.spin} size={28} />
          <p>Checking staff access…</p>
        </div>
      </main>
    );
  }

  if (!isStaff) {
    return (
      <main className={styles.page}>
        <div className={styles.centerState}>
          <div className={styles.accessIcon}>
            <ShieldCheck size={28} />
          </div>
          <h1>Staff access required</h1>
          <p>
            Academic structure management is available only to StudyHub staff.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroIcon}>
            <Layers3 size={24} />
          </div>

          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <ShieldCheck size={14} />
              Staff workspace
            </span>
            <h1>Academic Structure</h1>
            <p>
              Manage branches, semesters, and subjects without exposing
              university or college creation to regular users.
            </p>
          </div>

          <button
            type="button"
            className={styles.refreshButton}
            onClick={loadAcademicData}
            disabled={loadingData}
          >
            <RefreshCw size={16} className={loadingData ? styles.spin : ""} />
            Refresh
          </button>
        </section>

        {renderStatus()}

        {dataError && (
          <div className={styles.error} role="alert">
            <AlertCircle size={18} />
            <span>{dataError}</span>
            <button type="button" className={styles.inlineButton} onClick={loadAcademicData}>
              Try again
            </button>
          </div>
        )}

        <div className={styles.tabs} role="tablist" aria-label="Academic management">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "branches"}
            className={activeTab === "branches" ? styles.activeTab : styles.tab}
            onClick={() => {
              resetForms();
              setActiveTab("branches");
            }}
          >
            <GraduationCap size={16} />
            Branches
            <span>{branches.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "semesters"}
            className={activeTab === "semesters" ? styles.activeTab : styles.tab}
            onClick={() => {
              resetForms();
              setActiveTab("semesters");
            }}
          >
            <Layers3 size={16} />
            Semesters
            <span>{semesters.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "subjects"}
            className={activeTab === "subjects" ? styles.activeTab : styles.tab}
            onClick={() => {
              resetForms();
              setActiveTab("subjects");
            }}
          >
            <BookOpen size={16} />
            Subjects
            <span>{subjects.length}</span>
          </button>
        </div>

        {loadingData ? (
          <section className={styles.loadingCard}>
            <Loader2 size={22} className={styles.spin} />
            <span>Loading academic structure…</span>
          </section>
        ) : (
          <>
            {activeTab === "branches" && (
              <div className={styles.managementGrid}>
                <form className={styles.formCard} onSubmit={handleBranchSubmit}>
                  <div className={styles.formHeader}>
                    <div>
                      <span className={styles.sectionLabel}>
                        {editingId ? "EDIT BRANCH" : "NEW BRANCH"}
                      </span>
                      <h2>{editingId ? "Update branch" : "Add a branch"}</h2>
                    </div>
                    {editingId && (
                      <button type="button" className={styles.cancelButton} onClick={resetForms}>
                        <X size={15} />
                        Cancel
                      </button>
                    )}
                  </div>

                  <div className={styles.formGrid}>
                    <label>
                      Branch name
                      <input
                        value={branchForm.name}
                        onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                        placeholder="Computer Science and Engineering"
                      />
                    </label>

                    <label>
                      Branch code
                      <input
                        value={branchForm.code}
                        onChange={(e) => setBranchForm({ ...branchForm, code: e.target.value.toUpperCase() })}
                        placeholder="CSE"
                      />
                    </label>

                    <label className={styles.full}>
                      Degree
                      <select
                        value={branchForm.degree}
                        onChange={(e) => setBranchForm({ ...branchForm, degree: e.target.value })}
                      >
                        <option value="">Select a degree</option>
                        {degrees.map((degree) => (
                          <option key={degree.id} value={degree.id}>
                            {degree.name} · {degree.college ? `College #${degree.college}` : "Degree"}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Short name
                      <input
                        value={branchForm.short_name}
                        onChange={(e) => setBranchForm({ ...branchForm, short_name: e.target.value })}
                        placeholder="CSE"
                      />
                    </label>

                    <label>
                      Degree code
                      <input
                        value={branchForm.degree_code}
                        onChange={(e) => setBranchForm({ ...branchForm, degree_code: e.target.value })}
                        placeholder="BTECH"
                      />
                    </label>

                    <label>
                      Duration (years)
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={branchForm.duration_years}
                        onChange={(e) => setBranchForm({ ...branchForm, duration_years: e.target.value })}
                      />
                    </label>

                    <label className={styles.full}>
                      Description
                      <textarea
                        value={branchForm.description}
                        onChange={(e) => setBranchForm({ ...branchForm, description: e.target.value })}
                        placeholder="Describe the branch or specialization."
                        rows="4"
                      />
                    </label>

                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={branchForm.is_active}
                        onChange={(e) => setBranchForm({ ...branchForm, is_active: e.target.checked })}
                      />
                      Active branch
                    </label>
                  </div>

                  <button type="submit" className={styles.primaryButton} disabled={saving}>
                    {saving ? <Loader2 size={17} className={styles.spin} /> : editingId ? <Save size={17} /> : <Plus size={17} />}
                    {saving ? "Saving…" : editingId ? "Save changes" : "Add branch"}
                  </button>
                </form>

                <section className={styles.listCard}>
                  <div className={styles.listHeader}>
                    <div>
                      <span className={styles.sectionLabel}>EXISTING</span>
                      <h2>Branches</h2>
                    </div>
                    <span className={styles.count}>{branches.length}</span>
                  </div>

                  <div className={styles.list}>
                    {branches.length === 0 ? (
                      <div className={styles.empty}>No branches added yet.</div>
                    ) : (
                      branches.map((branch) => {
                        const degree = degreeMap.get(branch.degree);

                        return (
                          <article className={styles.item} key={branch.id}>
                            <div className={styles.itemIcon}><GraduationCap size={18} /></div>
                            <div className={styles.itemBody}>
                              <strong>{branch.name}</strong>
                              <span>{branch.code} · {degree?.name || "Degree unavailable"}</span>
                            </div>
                            <div className={styles.itemActions}>
                              <button type="button" className={styles.iconButton} onClick={() => startEditBranch(branch)} aria-label={`Edit ${branch.name}`}>
                                <Pencil size={16} />
                              </button>
                              <button
                                type="button"
                                className={styles.iconButtonDanger}
                                onClick={() => removeItem("branch", branch.id, branch.name)}
                                disabled={deletingKey === `branch-${branch.id}`}
                                aria-label={`Delete ${branch.name}`}
                              >
                                {deletingKey === `branch-${branch.id}` ? <Loader2 size={16} className={styles.spin} /> : <Trash2 size={16} />}
                              </button>
                            </div>
                          </article>
                        );
                      })
                    )}
                  </div>
                </section>
              </div>
            )}

            {activeTab === "semesters" && (
              <div className={styles.managementGrid}>
                <form className={styles.formCard} onSubmit={handleSemesterSubmit}>
                  <div className={styles.formHeader}>
                    <div>
                      <span className={styles.sectionLabel}>
                        {editingId ? "EDIT SEMESTER" : "NEW SEMESTER"}
                      </span>
                      <h2>{editingId ? "Update semester" : "Add a semester"}</h2>
                    </div>
                    {editingId && (
                      <button type="button" className={styles.cancelButton} onClick={resetForms}>
                        <X size={15} />
                        Cancel
                      </button>
                    )}
                  </div>

                  <div className={styles.formGrid}>
                    <label className={styles.full}>
                      Branch
                      <select
                        value={semesterForm.branch}
                        onChange={(e) => setSemesterForm({ ...semesterForm, branch: e.target.value })}
                      >
                        <option value="">Select a branch</option>
                        {branches.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.name} · {branch.code}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Semester number
                      <select
                        value={semesterForm.number}
                        onChange={(e) => setSemesterForm({ ...semesterForm, number: e.target.value })}
                      >
                        {Array.from({ length: 12 }, (_, index) => index + 1).map((number) => (
                          <option key={number} value={number}>
                            Semester {number}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <button type="submit" className={styles.primaryButton} disabled={saving}>
                    {saving ? <Loader2 size={17} className={styles.spin} /> : editingId ? <Save size={17} /> : <Plus size={17} />}
                    {saving ? "Saving…" : editingId ? "Save changes" : "Add semester"}
                  </button>
                </form>

                <section className={styles.listCard}>
                  <div className={styles.listHeader}>
                    <div>
                      <span className={styles.sectionLabel}>EXISTING</span>
                      <h2>Semesters</h2>
                    </div>
                    <span className={styles.count}>{semesters.length}</span>
                  </div>

                  <div className={styles.list}>
                    {semesters.length === 0 ? (
                      <div className={styles.empty}>No semesters added yet.</div>
                    ) : (
                      semesters
                        .slice()
                        .sort((a, b) => {
                          const branchCompare = (branchMap.get(a.branch)?.name || "").localeCompare(branchMap.get(b.branch)?.name || "");
                          return branchCompare || Number(a.number) - Number(b.number);
                        })
                        .map((semester) => (
                          <article className={styles.item} key={semester.id}>
                            <div className={styles.itemIcon}><Layers3 size={18} /></div>
                            <div className={styles.itemBody}>
                              <strong>Semester {semester.number}</strong>
                              <span>{branchMap.get(semester.branch)?.name || "Branch unavailable"}</span>
                            </div>
                            <div className={styles.itemActions}>
                              <button type="button" className={styles.iconButton} onClick={() => startEditSemester(semester)} aria-label={`Edit semester ${semester.number}`}>
                                <Pencil size={16} />
                              </button>
                              <button
                                type="button"
                                className={styles.iconButtonDanger}
                                onClick={() => removeItem("semester", semester.id, `Semester ${semester.number}`)}
                                disabled={deletingKey === `semester-${semester.id}`}
                                aria-label={`Delete semester ${semester.number}`}
                              >
                                {deletingKey === `semester-${semester.id}` ? <Loader2 size={16} className={styles.spin} /> : <Trash2 size={16} />}
                              </button>
                            </div>
                          </article>
                        ))
                    )}
                  </div>
                </section>
              </div>
            )}

            {activeTab === "subjects" && (
              <div className={styles.managementGrid}>
                <form className={styles.formCard} onSubmit={handleSubjectSubmit}>
                  <div className={styles.formHeader}>
                    <div>
                      <span className={styles.sectionLabel}>
                        {editingId ? "EDIT SUBJECT" : "NEW SUBJECT"}
                      </span>
                      <h2>{editingId ? "Update subject" : "Add a subject"}</h2>
                    </div>
                    {editingId && (
                      <button type="button" className={styles.cancelButton} onClick={resetForms}>
                        <X size={15} />
                        Cancel
                      </button>
                    )}
                  </div>

                  <div className={styles.formGrid}>
                    <label className={styles.full}>
                      Semester
                      <select
                        value={subjectForm.semester}
                        onChange={(e) => setSubjectForm({ ...subjectForm, semester: e.target.value })}
                      >
                        <option value="">Select a semester</option>
                        {semesters
                          .slice()
                          .sort((a, b) => Number(a.number) - Number(b.number))
                          .map((semester) => (
                            <option key={semester.id} value={semester.id}>
                              Semester {semester.number} · {branchMap.get(semester.branch)?.name || "Branch"}
                            </option>
                          ))}
                      </select>
                    </label>

                    <label>
                      Subject name
                      <input
                        value={subjectForm.name}
                        onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                        placeholder="Data Structures"
                      />
                    </label>

                    <label>
                      Subject code
                      <input
                        value={subjectForm.code}
                        onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value.toUpperCase() })}
                        placeholder="CS301"
                      />
                    </label>
                  </div>

                  <button type="submit" className={styles.primaryButton} disabled={saving}>
                    {saving ? <Loader2 size={17} className={styles.spin} /> : editingId ? <Save size={17} /> : <Plus size={17} />}
                    {saving ? "Saving…" : editingId ? "Save changes" : "Add subject"}
                  </button>
                </form>

                <section className={styles.listCard}>
                  <div className={styles.listHeader}>
                    <div>
                      <span className={styles.sectionLabel}>EXISTING</span>
                      <h2>Subjects</h2>
                    </div>
                    <span className={styles.count}>{subjects.length}</span>
                  </div>

                  <div className={styles.list}>
                    {subjects.length === 0 ? (
                      <div className={styles.empty}>No subjects added yet.</div>
                    ) : (
                      subjects.map((subject) => {
                        const semester = semesterMap.get(subject.semester);
                        const branch = semester ? branchMap.get(semester.branch) : null;

                        return (
                          <article className={styles.item} key={subject.id}>
                            <div className={styles.itemIcon}><BookOpen size={18} /></div>
                            <div className={styles.itemBody}>
                              <strong>{subject.name}</strong>
                              <span>{subject.code} · Sem {semester?.number || "—"} · {branch?.code || "—"}</span>
                            </div>
                            <div className={styles.itemActions}>
                              <button type="button" className={styles.iconButton} onClick={() => startEditSubject(subject)} aria-label={`Edit ${subject.name}`}>
                                <Pencil size={16} />
                              </button>
                              <button
                                type="button"
                                className={styles.iconButtonDanger}
                                onClick={() => removeItem("subject", subject.id, subject.name)}
                                disabled={deletingKey === `subject-${subject.id}`}
                                aria-label={`Delete ${subject.name}`}
                              >
                                {deletingKey === `subject-${subject.id}` ? <Loader2 size={16} className={styles.spin} /> : <Trash2 size={16} />}
                              </button>
                            </div>
                          </article>
                        );
                      })
                    )}
                  </div>
                </section>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default AcademicManagement;
