import {
  University,
  MapPin,
  Globe,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

import Breadcrumbs from "../../components/Academic/Breadcrumbs/Breadcrumbs";
import AcademicPath from "../../components/Academic/AcademicPath/AcademicPath";
import AcademicSearch from "../../components/Academic/AcademicSearch/AcademicSearch";
import CollegeCard from "../../components/Academic/CollegeCard/CollegeCard";
import Loading from "../../components/Loading/Loading";
import InstitutionRequestCTA from "../../components/InstitutionRequestCTA/InstitutionRequestCTA";

import styles from "./UniversityDetails.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getColleges from "../../services/collegeServices";

export default function UniversityDetails() {
  const { universityId } = useParams();

  const [colleges, setColleges] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [university, setUniversity] = useState({
    id: 0,
    name: "",
    code: "",
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    website: "",
    email: "",
    phone: "",
    established_year: null,
    logo: "",
    is_active: true,
  });

  const [query, setQuery] = useState("");

  const visible = colleges.filter(
    (college) =>
      college.name.toLowerCase().includes(query.toLowerCase()) ||
      college.code.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    console.log("University details mounted");

    getColleges(universityId)
      .then((response) => {
        console.log(response.data);

        setColleges(response.data.colleges);
        setUniversity(response.data.university);
      })
      .catch((error) => {
        console.log("Got an error:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      console.log("University details unmounted");
    };
  }, [universityId]);

  function handleOnchange(event) {
    setQuery(event.target.value);
  }

  return (
    <main className={styles.page}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>

          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Universities" },
              { label: university.name },
            ]}
          />

          {/* Academic Navigation */}
          <AcademicPath active={0} />

          {/* University Header */}
          <section className={styles.header}>
            {/* <div className={styles.icon}>
              <University size={26} />
            </div> */}
            <div className={styles.logo}>
          {university.logo ? (
            <img
              src={university.logo}
              alt={`${university.name} logo`}
            />
          ) : (
            <span>
              {university.code?.charAt(0)}
            </span>
          )}
        </div>

            <div>
              <span>{university.code}</span>

              <h1>{university.name}</h1>

              <p>
                <MapPin size={15} />

                {university.city}
                {university.state && `, ${university.state}`}

                {university.pincode &&
                  ` - ${university.pincode}`}
              </p>
            </div>
          </section>

          {/* University Description */}
          {university.description && (
            <section className={styles.infoSection}>
              <div className={styles.sectionHead}>
                <div>
                  <span>ABOUT UNIVERSITY</span>
                  <h2>About</h2>
                </div>
              </div>

              <p className={styles.description}>
                {university.description}
              </p>
            </section>
          )}

          {/* University Information */}
          <section className={styles.infoSection}>
            <div className={styles.sectionHead}>
              <div>
                <span>UNIVERSITY INFORMATION</span>
                <h2>Details</h2>
              </div>
            </div>

            <div className={styles.infoGrid}>

              {university.address && (
                <div className={styles.infoItem}>
                  <MapPin size={18} />

                  <div>
                    <span>Address</span>

                    <p>
                      {university.address}
                      {university.city &&
                        `, ${university.city}`}
                      {university.state &&
                        `, ${university.state}`}
                      {university.pincode &&
                        ` - ${university.pincode}`}
                    </p>
                  </div>
                </div>
              )}

              {university.established_year && (
                <div className={styles.infoItem}>
                  <Calendar size={18} />

                  <div>
                    <span>Established</span>
                    <p>{university.established_year}</p>
                  </div>
                </div>
              )}

              {university.website && (
                <div className={styles.infoItem}>
                  <Globe size={18} />

                  <div>
                    <span>Website</span>

                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              )}

              {university.email && (
                <div className={styles.infoItem}>
                  <Mail size={18} />

                  <div>
                    <span>Email</span>

                    <a href={`mailto:${university.email}`}>
                      {university.email}
                    </a>
                  </div>
                </div>
              )}

              {university.phone && (
                <div className={styles.infoItem}>
                  <Phone size={18} />

                  <div>
                    <span>Phone</span>

                    <a href={`tel:${university.phone}`}>
                      {university.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Colleges */}
          <section>
             <div className={styles.collegeHeader}>
    <div>
      <span>ACADEMIC NETWORK</span>
      <h2>Explore Colleges</h2>
      <p>Find colleges affiliated with this university.</p>
    </div>

              <AcademicSearch
                placeholder="Search colleges..."
                value={query}
                onChange={handleOnchange}
              />
            </div>

            {visible.length > 0 ? (
              <div className={styles.grid}>
                {visible.map((college) => (
                  <CollegeCard
                    key={college.id}
                    college={college}
                  />
                ))}
              </div>
            ) : (
              <p className={styles.empty}>
                No colleges found.
              </p>
            )}
          </section>

          <InstitutionRequestCTA />

        </div>
      )}
    </main>
  );
}